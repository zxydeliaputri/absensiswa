<template>
  <div>
    <button @click="logout()" class="btn btn-danger">LogOut</button>
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Tanggal</th>
          <th>Nama</th>
          <th>Keterangan</th>
          <th>Matpel</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="visitor,i in datas" :key="visitor.id">
          <td>{{ i }}</td>
          <td>{{ visitor.tanggal }}</td>
          <td>{{ visitor.id_siswa.nama }}</td>
          <td v-if="visitor.keterangan">Hadir</td>
          <td v-else>tidak hadir</td>
          <td>{{ visitor.id_matpel.matpel }}</td>
          <button class="btn btn-info btn-sm ">
          <NuxtLink to="admin/" class="text-dark text-decoration-none text-light text-center">Lihat</NuxtLink>
          </button>
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
  );
  datas.value = data;
  console.log(data)
}
function logout(){
  const{error}= supa.auth.signOut()
  navigateTo("/")
}
onMounted(() => {
  ambilData();
});
</script>
