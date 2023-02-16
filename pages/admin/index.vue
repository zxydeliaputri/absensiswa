<template>
  <div>
      <h1 class="text-center">SELAMAT DATANG SEKRETARIS</h1>
      <NuxtLink to="/admin/tambah" class="btn btn-success text-white m-3">Absen</NuxtLink>
      <button class="btn btn-danger mx-1" @click="logout()">LogOut</button> <br />
      <table class="table">
        <thead>
          <tr class="text-white bg-primary">
            <th>#</th>
            <th>Tanggal</th>
            <th>Nama</th>
            <th>Keterangan</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="visitor,i in datas" :key="visitor.id">
            <td>{{ i }}</td>
            <td>{{ visitor.tanggal }}</td>
            <td>{{ visitor.id_siswa.nama }}</td>
            <td v-if="visitor.keterangan">Hadir</td>
            <td v-else>Tidak Hadir</td>
            <NuxtLink to="`/admin/${admin.id}`">Lihat</NuxtLink>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const supa = useSupabaseAuthClient()
const supabase = useSupabaseClient();
const datas = ref([]);

async function ambilData() {
 
  const { data, error } = await supabase
  .from("kehadiran")
  .select(`tanggal,keterangan,id_matpel(matpel),id_siswa(nama)`
  )

  datas.value = data;
  console.log(data)
}
function logout(){
  const{error}= supa.auth.signOut()
  navigateTo("/login")
}
onMounted(() => {
  ambilData();
});
</script>
