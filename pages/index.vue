<template>
  <div class="">
    <div class="container pt-5">

    
        <div class="card shadow">
          <div class="card-header bg-dark">
             <h3 class="text-light">ABSENSI SISWA RPS RPL</h3>
          </div>
          <div class="card-body">
          
    <table class="table mt-2 table-striped nowrap table-border">
      <thead>
        <tr class="text-white bg-dark">
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
          <td><NuxtLink :to="`/admin/`+visitor.id_siswa.id" class="text-decoration-none ">{{visitor.id_siswa.nama}}</NuxtLink></td>
          <td>{{visitor.id_keterangan.status}}</td>
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

async function ambilData() {
  const { data, error } = await supabase
  .from("kehadiran")
  .select(`tanggal,id_keterangan(status),id_siswa(id,nama)`
  )
  .order('id',{ascending:false})
  .limit('id_siswa')
  datas.value = data;
}

onMounted(() => {
  ambilData();
});
</script>
