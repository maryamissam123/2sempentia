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
        <img src="/images/milton.png" alt="Milton Huse" class="logo" />
      </header>

      <main class="menu-options">
        <RouterLink :to="{ path: 'login-create', query: { role: 'customer' } }" class="menu-btn menu-btn--house">
          <div class="icon-box">
            <img src="/icons/Customer.png" alt="" />
          </div>
          <span>MIT HUS</span>
        </RouterLink>
		<RouterLink :to="{ path: 'login-create', query: { role: 'manager' } }" class="menu-btn menu-btn--manager">
		  <div class="icon-box">
			<img src="/icons/Manager.png" alt="" />
		  </div>
		  <span>BYGGELEDER</span>
        </RouterLink>
        <RouterLink :to="{ path: 'login-create', query: { role: 'admin' } }" class="menu-btn menu-btn--admin">
          <div class="icon-box">
            <img src="/icons/Files.png" alt="" />
          </div>
          <span>ADMINISTRATOR</span>
        </RouterLink>
      </main>
    </div>
  </div>
</template>