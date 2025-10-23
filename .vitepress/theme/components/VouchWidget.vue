<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
        <div class="modal-container">
          <button class="modal-close" @click="closeModal" aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="modal-content">
            <div class="iframe-shell">
              <iframe
                src="https://widget.switch.win/widget?network=pulsechain&background_color=1a1a1a&backdrop_color=1a1a1a&font_color=ffffff&secondary_font_color=8e9397&border_color=ff8a3b&from=0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee&to=0xD34f5ADC24d8Cc55C1e832Bdf65fFfDF80D1314f"
                allow="clipboard-read; clipboard-write"
                width="100%"
                height="900px"
                frameborder="0"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isOpen = ref(false);

const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const handleEscape = (e) => {
  if (e.key === 'Escape' && isOpen.value) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleEscape);
  window.openVouchWidget = openModal;
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleEscape);
  delete window.openVouchWidget;
  document.body.style.overflow = '';
});

defineExpose({ openModal, closeModal });
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 20px;
}

.modal-container {
  position: relative;
  background: transparent !important; /* force container transparent to avoid white frame */
  border-radius: 12px;
  width: 100%;
  max-width: 480px;
  max-height: 90vh;
  overflow: visible;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  padding: 0 !important;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
  background: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;
}

.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);
  transform: scale(1.1);
}

.modal-content {
  width: 100%;
  height: 100%;
  overflow: auto;
  background: transparent !important;
}

.iframe-shell {
  background: #0f0f0f; /* dark shell for the widget */
  border-radius: 18px;
  overflow: hidden;
  padding: 0; /* remove extra inner padding so the shell touches edges */
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.6);
  margin: 0;
}

.iframe-shell iframe {
  display: block;
  border: none;
  min-height: 900px;
  width: 100%;
  border-radius: 12px;
  background: transparent;
}

/* Animation */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    max-width: 100%;
    max-height: 100vh;
    border-radius: 0;
  }

  .modal-overlay {
    padding: 0;
  }
}
</style>
