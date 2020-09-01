<template>
  <div>
    <navbar />
    <div class="container-fluid container-lg h-100">
      <div class="row">
        <listeners />
        <addtags />
        <edittags />
      </div>
    </div>
  </div>
</template>

<script>
import navbar from './navbar'
import listeners from './listeners'
import addtags from './addtags'
import edittags from './edittags'

export default {
  components: {
    navbar,
    listeners,
    addtags,
    edittags,
  },
}
</script>
