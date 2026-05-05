<script setup>
import { ref } from 'vue';
import { storage } from '@/firebase';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

const emit = defineEmits(['uploaded']);

const uploading = ref(false);
const previewUrl = ref(null);

async function handleFileChange(event) {
  const file = event.target.files[0];
  if (!file) return;

  uploading.value = true;

  // Upload til Firebase Storage
  const fileRef = storageRef(storage, `projects/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);

  // Hent download-URL
  const url = await getDownloadURL(fileRef);
  previewUrl.value = url;

  // Send URL'en op til forælderen
  emit('uploaded', url);
}
</script>

    <template>
  <div class="photo-upload">
    <input type="file" accept="image/*" @change="handleFileChange" />
    
    <p v-if="uploading">Uploader...</p>

    <img v-if="previewUrl" :src="previewUrl" alt="Preview" />
  </div>
</template>