<template>
  <div>
    <div class="col-md-4">
      <div class="card">
        <div class="card-header bg-dark">
          <h3 class="fw-bold text-light">Tambah Kelas</h3>
        </div>
        <div class="card-body">
          <form method="post" @submit.prevent="tambah">
            <input type="text" class="form-control" id="kelas" v-model="nama" />
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseAuthClient();
const nama = ref();

async function tambah() {
  const { error } = await supabase.from("kelas").insert({
    kelas: nama.value,
  });
}
</script>

<style lang="scss" scoped></style>
