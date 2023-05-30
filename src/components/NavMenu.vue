<script setup lang="ts">
  const menuOpen = ref(false)
</script>

<template>
  <nav></nav>
  <label
    for="menu-toggle"
    class="menu-icon-wrapper"
  >
    <input
      id="menu-toggle"
      v-model="menuOpen"
      type="checkbox"
    />
    <div class="menu-icon">
      <span :class="{ toggled: menuOpen }"></span>
      <span :class="{ toggled: menuOpen }"></span>
    </div>
  </label>
</template>

<style scoped>
  * {
    --icon-size: 30px;
  }

  .menu-icon-wrapper {
    cursor: pointer;
  }

  input {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
  }

  label {
    position: relative;
    align-self: flex-start;
    width: var(--icon-size);
    height: var(--icon-size);
  }

  .menu-icon {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
  }

  .menu-icon span {
    width: var(--icon-size);
    height: 1px;
    background-color: var(--light-beige);
    opacity: 1;
    transition: 0.3s ease transform, 0.3s ease top, 0.3s ease width,
      0.3s ease right, opacity 0.15s ease;
  }

  .menu-icon span:first-child {
    transform: translateY(calc(var(--icon-size) / 2.5));
  }

  .menu-icon span:last-child {
    transform: translateY(calc(var(--icon-size) / -2.5));
  }

  .menu-icon span:first-child.toggled {
    transform: translateY(calc(var(--icon-size) / 2)) rotateZ(45deg);
  }

  .menu-icon span:last-child.toggled {
    transform: translateY(calc(var(--icon-size) / -2)) rotateZ(-45deg);
  }
</style>
