<template>
  <div>
    <div class="col-md-4 m-auto card p-3 mt-5">
      <div class="text-center fw-bolder text-dark">ISI ABSEN</div>
    <form @submit.prevent="simpan()">
    
      <select class="form-control" v-model="nama">
        <option value="pilih nama"  disabled>pilih nama</option>
        <option v-for="data in students" :key="data.id"  :value="data.id">{{data.nama}}</option>
      </select> <br />
      <div class="form-check form-switch">
        <input v-model="keterangan" class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
        <label class="form-check-label" for="flexSwitchCheckDefault">
          <span v-if="keterangan">Hadir</span>
          <span v-else>Tidak Hadir</span>
        </label>
      </div>
      <select class="form-control" v-model="matpel">
        <option value="pilih matpel" disabled >pilih matpel</option>
        <option v-for="data in datas" :key="data.id"  :value="data.id">{{data.matpel}}</option>
      </select><br>
      <button type="submit" class="btn btn-primary">Simpan</button>
      <NuxtLink to="/" class="btn btn-warning text-light mx-3">Kembali</NuxtLink>
    </form>
    </div>
  </div>
</template>

<script setup>
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
    navigateTo("/admin");
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
