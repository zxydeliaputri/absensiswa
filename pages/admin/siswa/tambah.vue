<template>
  <div>
    <div class="row">
      <div class="col-md-6 col-10 m-auto">
        <div class="card">
          <div class="card-header bg-dark">
            <h3 class="text-light">tambah siswa</h3>
          </div>
          <div class="card-body">
            <form method="post" @submit.prevent="tambahsiswa">
              <label for="" class="fw-semibold mt-3">Nama</label>
              <input type="text" v-model="nama" class="form-control" />
              <label for="" class="fw-semibold mt-3">Kelas</label>
              <select v-model="kelas" class="form-control">
                <option v-for="k in dkelas" :value="k.id" :key="k.id">
                  {{ k.kelas }}
                </option>
              </select>
              <button class="btn btn-dark mt-3">Tambah</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseAuthClient();
const kelas = ref();
const nama = ref();
const dkelas = ref([]);
async function getKelas() {
  const { data, error } = await supabase.from("kelas").select();
  dkelas.value = data;
}
async function tambahsiswa() {
  const { data } = await supabase.from("siswa").insert({
    nama: nama.value,
    id_kelas: kelas.value,
  });
  nama.value = "";
}
onMounted(() => {
  getKelas();
});
</script>
