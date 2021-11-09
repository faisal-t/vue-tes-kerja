<template>
  <div>
    <Create />
    <Edit :barangEdit="barangEdit"/>
    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h6 class="text-primary font-weight-bold">Daftar Barang</h6>
          </div>
          <div class="ml-auto">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              data-toggle="modal"
              data-target="#modal-create"
            >
              <i class="fas fa-plus"></i>
              Tambah
            </button>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table
          id="example"
          class="table table-striped table-bordered"
          style="width: 100%"
        >
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Barang</th>
              <th>Jenis Barang</th>
              <th>Stok</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.jenis.name }}</td>
              <td>{{ item.stok }}</td>
              <td>
               <button
                  class="btn btn-sm btn-primary mb-1"
                  v-on:click.prevent="edit(item)"
                >
                  <i class="fas fa-fw fa-book"></i>
                  Edit
                </button>

                <button
                  class="d-inline-block btn btn-sm btn-danger mb-1"
                  type="submit"
                  v-on:click.prevent="destroy(item.id)"
                >
                  <i class="fas fa-fw fa-trash"></i>
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import Edit from './Edit';
import Create from "./Create";

export default {
  data: () => ({
    data: [],
    barangEdit: {}
  }),
  components: {
    Create,
    Edit,
  },
  mounted() {
    window.axios.get("barang").then((e) => {
      this.data = e.data.data;
    });
    window.$("#example").DataTable();
  },
  watch: {
    barangEdit() {
      window.axios.get(`barang/${this.barangEdit.id}`).then((e) => {
        this.barang_id = e.data.barang_id;
        this.terjual = e.data.terjual;
      });
    },
  },
  methods: {
    destroy(id) {
      if (confirm("Yakin ingin dihapus?")) {
        window.axios.delete(`barang/${id}`).then(() => window.location.reload());
      }
    },
    modalCreate() {
      window.$("#modal-create").modal();
    },
    edit(item) {
      this.barangEdit = item;
      window.$("#modal-edit").modal();
    },
  },
};
</script>