<template>
  <div>
    <h1 class="text-center">Persentase Kehadiran Siswa</h1>
    <table class="table">
      <thead>
        <tr class="text-white bg-primary">
          <th>#</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Keterangan</th>
          <th>Matpel</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitor , i in datas" :key="visitor.id">
          <td>{{ i }}</td>
          <td>{{ visitor.tanggal }}</td>
          <td>{{ visitor.id_siswa.naccma }}</td> 
          <td v-if="visitor.keterangan">Hadir</td>
          <td v-else>Tidak Hadir</td>
          <td>{{ visitor.id_matpel.matpel }}</td>
        </tr>
      </tbody>
    </table>
    <NuxtLink to="/admin" class="btn btn-warning text-light mx-3">Kembali</NuxtLink>
  </div>
</template>
    

<script setup>

const supabase = useSupabaseClient();
const datas = ref([]);
const route = useRoute();

async function ambilData() {

  const { data, error } = await supabase
  
  .from("kehadiran")
  .select(`tanggal,keterangan,id_matpel(matpel),id_siswa(nama)`
  )
  .eq("id", route.params.id)
  .single();
  datas.value = data;
    console.log('params:', route.params.id);
}
onMounted(() => {
  ambilData();
});
</script>