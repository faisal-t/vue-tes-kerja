<template>
  <div>
    <Create />
    <Edit :jenisEdit="jenisEdit" />

    <div class="card">
      <div class="card-header">
        <div class="row">
          <div class="col">
            <h6 class="text-primary font-weight-bold">Daftar Jenis Barang</h6>
          </div>
          <div class="ml-auto">
            <button
              type="button"
              class="btn btn-sm btn-outline-primary"
              v-on:click="modalCreate()"
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
              <th>Nama Jenis Barang</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="item.id">
              <td>{{ index + 1 }}</td>
              <td>{{ item.name }}</td>
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
import Create from "./Create";
import Edit from "./Edit";

export default {
  data: () => ({
    data: [],
    jenisEdit: {},
  }),
  components: {
    Create,
    Edit,
  },
  mounted() {
    window.axios.get("jenis").then((e) => {
      this.data = e.data.data;
      window.$("#example").DataTable();
    });
  },
  methods: {
    destroy(id) {
      if (confirm("Yakin ingin dihapus?")) {
        window.axios.delete(`jenis/${id}`).then(() => window.location.reload());
      }
    },
    modalCreate() {
      window.$("#modal-create").modal();
    },
    edit(item) {
      this.jenisEdit = item;
      window.$("#modal-edit").modal();
    },
  },
};
</script>
