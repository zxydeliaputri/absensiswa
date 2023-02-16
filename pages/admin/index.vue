<template>
  <div class="container">
      <h1 class="text-center">SELAMAT DATANG SEKRETARIS</h1>
      <NuxtLink to="/admin/tambah" class="btn btn-success text-white m-3"><i class="fa-sharp fa-solid fa-user-plus"></i>Absen</NuxtLink>
      <button class="btn btn-danger mx-1" @click="logout()">LogOut</button> <br />
      <table class="table">
        <thead>
          <tr class="text-white bg-dark">
         
            <th>Nama</th>
            <th>Kelas</th>
            <th>Tanggal</th>
            <th>Keterangan</th>
    
          </tr>
        </thead>
        <tbody>
          <tr v-for="visitor in datas" :key="visitor.id">
            <td class="text-uppercase">   <NuxtLink :to="`/admin/`+visitor.id_siswa.id" class="text-decoration-none ">{{visitor.id_siswa.nama}}</NuxtLink></td>
            <td>{{visitor.id_siswa.id_kelas.kelas}}</td>
            <td>{{ visitor.tanggal }}</td>
            <td class="text-uppercase">{{ visitor.id_keterangan.status }}</td>          
            <td>
         
            </td>
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
const route = useRoute()


async function ambilData() {
  const { data, error } = await supabase
    .from("kehadiran")
    .select(`
      tanggal,
      id_keterangan(status),
      id_siswa(id,nama,id_kelas:kelas(kelas))
    `)
    .order('id', { ascending: false })

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
