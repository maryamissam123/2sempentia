<script setup>
defineProps({
  label: String,
  variant: {
    type: String,
    default: "primary"
  }
});
</script>

<template>
  <div class="login-page start-view">
    <div class="login-container">
      <header class="login-header">
        <img src="@/assets/images/milton.png" alt="Milton Huse" class="logo" />
      </header>

      <main class="menu-options">
        <RouterLink :to="{ path: 'login-create', query: { role: 'customer' } }" class="menu-btn menu-btn--house">
          <div class="icon-box">
            <img src="@/assets/icons/Kunde.png" alt="" />
          </div>
          <span>MIT HUS</span>
        </RouterLink>

        <button class="menu-btn menu-btn--manager" @click="$router.push('/login-create')">
          <div class="icon-box">
            <img src="@/assets/icons/Byggeleder.png" alt="" />
          </div>
          <span>BYGGELEDER</span>
        </button>

        <button class="menu-btn menu-btn--admin" @click="$router.push('/login-create')">
          <div class="icon-box">
            <img src="@/assets/icons/Filer.png" alt="" />
          </div>
          <span>ADMINISTRATOR</span>
        </button>
      </main>
    </div>
  </div>
</template>