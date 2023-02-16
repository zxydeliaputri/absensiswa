<template>
  <div>
    <h1 class="text-center">ABSENSI SISWA KELAS XII - RPL 2</h1>
    <NuxtLink to="/login" class="btn btn-success mx-3">Login</NuxtLink> 
    <table class="table mt-2">
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
          <td>{{ visitor.id_siswa.nama }}</td>
          <td v-if="visitor.keterangan">Hadir</td>
          <td v-else>Tidak Hadir</td>
          <td>{{ visitor.id_matpel.matpel }}</td>
     
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>


const supabase = useSupabaseClient();
const datas = ref([]);

async function ambilData() {
  const { data, error } = await supabase
  .from("kehadiran")
  .select(`tanggal,keterangan,id_matpel(matpel),id_siswa(nama)`
  );
  datas.value = data;
}

onMounted(() => {
  ambilData();
});
</script>
