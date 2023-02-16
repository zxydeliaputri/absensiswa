<template>
  <div>
    <div class="col-md-4 m-auto card p-3 mt-5 bg-success">
      <h3 class="text-center fw-bolder text-dark">LOGIN</h3>
    <div v-if="err" class="alert alert-danger">Email/Password Salah!</div>
    <form @submit.prevent="reg">
      <div class="mb-3">

        <label for="exampleInputEmail1" class="form-label">Email</label>
        <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
      </div>
      <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label" >Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1"  v-model="password">
      </div>

      <button type="submit" class="btn btn-info me-3 text-white">Login</button>
      <button type="submit" class="btn btn-warning">
        <NuxtLink to="/reg">SignUp</NuxtLink>
      </button>
    </form>
    </div>
  </div>  
</template>

<script setup>
const supabase = useSupabaseAuthClient()
const email = ref()
const password = ref()
const err = ref(false)

async function reg() {
  const { data, error } = await supabase
    .auth
    .signInWithPassword({ 
      email: email.value,
      password: password.value,
    });

  if (data) navigateTo('/admin')
  if (data) err.value = true;
}
</script>
