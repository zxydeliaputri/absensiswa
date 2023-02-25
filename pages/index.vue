<template>
  <div class="">
    <div class="container pt-5">
      <div class="card shadow">
        <div class="card-header bg-dark">
          <h3 class="text-light">ABSENSI SISWA RPS RPL</h3>
        </div>
        <div class="card-body">
          <div class="flex justify-between">
            <select class="form-select w-25" v-model="skelas">
              <option v-for="k in kelas" :key="k.id" :value="k.kelas">
                {{ k.kelas }}
              </option>
            </select>
          </div>

          <table class="table mt-2 table-striped nowrap table-border">
            <thead>
              <tr class="text-white bg-dark">
                <th>#</th>
                <th>Tanggal</th>
                <th>Nama</th>
                <th>Kelas</th>
                <th>Keterangan</th>
              </tr>
            </thead>
            <tbody>
              <!-- <tr v-if="loading">
                <td colspan="5" class="text-center">Sedang memuat...</td>
              </tr> -->
              <tr>
                <td colspan="5" v-if="dataFilter < 1" class="text-center">
                  silahkan pilih kelas
                </td>
              </tr>
              <tr v-for="(visitor, i) in dataFilter" :key="visitor.id">
                <td>{{ i + 1 }}</td>
                <td>{{ visitor.tanggal }}</td>
                <td>
                  <NuxtLink
                    :to="`/admin/` + visitor.id_siswa.id"
                    class="text-decoration-none"
                    >{{ visitor.id_siswa.nama }}</NuxtLink
                  >
                </td>
                <td>{{ visitor.id_siswa.id_kelas.kelas }}</td>
                <td>{{ visitor.id_keterangan.status }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const datas = ref([]);
const kelas = ref([]);
const loading = ref(true);
const skelas = ref("semua kelas");
async function ambilData() {
  loading.value = true;
  const { data, error } = await supabase
    .from("kehadiran")
    .select(`tanggal,id_keterangan(status),id_siswa(id,nama,id_kelas(kelas))`)
    .order("id", { ascending: false })
    .limit("id_siswa");
  datas.value = data;
  loading.value = false;
}
async function getKelas() {
  const { data, error } = await supabase.from("kelas").select();
  kelas.value = data;
}
const dataFilter = computed(() => {
  return datas.value.filter((i) => {
    return i.id_siswa.id_kelas.kelas.includes(skelas.value);
  });
});
onMounted(() => {
  ambilData();
  getKelas();
});
</script>
