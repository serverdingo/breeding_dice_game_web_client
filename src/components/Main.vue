<template>
  <div class="main">
  <head>
    <meta http-equiv="refresh" content="0; url='https://www.google.com'" />
  </head>
  <body>
    <p>Hmmm...</p>
  </body>
  </div>
</template>

<script>
export default {
  name: 'Main',
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
