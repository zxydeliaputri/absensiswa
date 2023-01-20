<template>
  <div>
    <h1>Isi Absen</h1>
    <form @submit.prevent="simpan()">
    
      <select class="form-control" v-model="nama">
        <option value="pilih nama"  disabled>pilih nama</option>
        <option v-for="data in students" :key="data.id"  :value="data.id">{{data.nama}}</option>
      </select> <br />
      <input type="checkbox" v-model="keterangan">
      <label for="hadir" class="text-dark">Hadir</label>
      <select class="form-control" v-model="matpel">
        <option value="pilih matpel" disabled >pilih matpel</option>
        <option v-for="data in datas" :key="data.id"  :value="data.id">{{data.matpel}}</option>
      </select><br>
      <button type="submit" class="btn btn-primary">Simpan</button>
      <NuxtLink to="/" class="btn btn-warning text-light mx-3">Kembali</NuxtLink>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})
const supabase = useSupabaseClient();

const nama = ref();
const keterangan = ref();
const matpel = ref();
const datas = ref([])
const students = ref([])


async function simpan() {
  // console.log(nama.value)
  // console.log(keterangan.value)
  // console.log(matpel.value)
    
    await supabase.from("kehadiran").insert({
      id_siswa: nama.value,
      keterangan: keterangan.value,
      id_matpel: matpel.value,
    
    });
    navigateTo("/");
}

async function getMatpel(){
  const{data,error} = await supabase
  .from("matpel")
  .select()
  datas.value = data
}
async function getSiswa(){
  const{data,error} = await supabase
  .from("siswa")
  .select()
  students.value = data
}

onMounted(()=>{
  getMatpel()
  getSiswa()
})
</script>
