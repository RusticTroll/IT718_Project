<template>
  <div class="flex justify-center">
    <form class="flex flex-col w-[75%] gap-2 p-4">
      <h1>Sign In</h1>
      <input name="email" type="text" placeholder="Email" required class="rounded-full p-2" />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        class="rounded-full p-2"
      />
      <input type="submit" value="Sign In" class="rounded-full p-2" onsubmit="signIn" />
    </form>
  </div>
</template>

<script lang="ts">
function signIn(event: SubmitEvent) {
  event.preventDefault()
}
</script>

<style scoped>
input {
  border: 1px gray solid;
}

form h1 {
  font-weight: bold;
  font-size: 20pt;
}
</style>
