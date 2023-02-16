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
      
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitor , i in datas" :key="visitor.id">
          <td>{{ i+1 }}</td>
          <td>{{ visitor.tanggal }}</td>
          <td>{{ visitor.id_siswa.nama }}</td> 
          <td>{{ visitor.id_keterangan.status }}</td> 
          
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
  .select(`tanggal,id_keterangan(status),id_siswa(nama)`
  )
  .eq("id_siswa", route.params.id)
 
  datas.value = data;
    console.log('params:', route.params.id);
}
onMounted(() => {
  ambilData();
});
</script>