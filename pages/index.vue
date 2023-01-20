<template>
  <div>
    <button class="btn btn-info text-light btn-sm">
      <NuxtLink to="/admin/tambah" class="text-decoration-none text-light">Absen</NuxtLink>
    </button>
    <table class="table">
      <thead>
        <tr>
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
