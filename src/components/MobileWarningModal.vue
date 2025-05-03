<template>
    <modal name="mobile-warning-modal" height="auto">
        Heyo! 👋 Serv here.<br/>
        Just a heads up the layout on mobile works, but is pretty scuffed.<br/>
        I'd recommend trying desktop until I get around to making mobile not so shitty :3
    </modal>
</template>

<script>
export default {
  name: 'MobileWarningModal',
};
</script>

<style>
.vm--modal {
  margin: 0;
  /*min-height: 100vh;*/
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  /*color: #35495e;*/
  background-color: #35495e;
  padding: 15px;
}
</style>
