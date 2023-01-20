<template>
  <div>
    <button @click="logout()">LogOut</button>
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
          <NuxtLink to="admin/visitor.id" class="btn btn-sm btn-primary text-dark">Lihat</NuxtLink>
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
