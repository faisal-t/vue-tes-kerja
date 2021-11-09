<template>
	<Create/>
	<Edit :transaksiEdit="transaksiEdit"/>

	<div class="card">
		<div class="card-header">
			<div class="row">
				<div class="col">
					<h6 class="text-primary font-weight-bold">Daftar Transaksi</h6>
				</div>
				<div class="ml-auto">
					<button type="button" class="btn btn-sm btn-outline-primary" v-on:click="modalCreate()">
						<i class="fas fa-plus"></i>
						Tambah
					</button>
				</div>
			</div>
		</div>
		<div class="card-body">
			<div class="d-flex justify-content-between">
				<div class="form-group">
					<label>Tanggal Transaksi</label>
					<input  @change="filterSearch()" type="date" v-model="tanggal_transaksi" class="form-control">
				</div>
				<div class="form-group">
					<label>Barang</label>
					<input  @change="filterSearch()" type="text" v-model="nama_barang" class="form-control">
				</div>
			</div>
			<table id="example" class="table table-striped table-bordered" style="width:100%">
				<thead>
					<tr>
						<th>No</th>
						<th>
							<div class="d-flex justify-content-between align-items-center">
								<span>Nama Barang</span>
								<div>
									<div>
										<input  @change="filterSearch()" type="radio" name="order_barang" class="form-check" value="asc" v-model="order_barang" style="appearance: none" id="order_barang_asc">
										<label for="order_barang_asc" role="button">
											<i class="fas small fa-arrow-up" :class="order_barang == 'asc' ? 'text-primary' : ''"></i>
										</label>
									</div>
									<div>
										<input  @change="filterSearch()" type="radio" name="order_barang" class="form-check" value="desc" v-model="order_barang" style="appearance: none" id="order_barang_desc">
										<label for="order_barang_desc" role="button">
											<i class="fas small fa-arrow-down" :class="order_barang == 'desc' ? 'text-primary' : ''"></i>
										</label>
									</div>
								</div>
							</div>
						</th>
						<th>Stok</th>
						<th>Terjual</th>
						<th>
							<div class="d-flex justify-content-between align-items-center">
								<span>Tanggal</span>
								<div>
									<div>
										<input @change="filterSearch()" type="radio" name="tanggal_barang" class="form-check" value="asc" v-model="order_tanggal" style="appearance: none" id="tanggal_barang_asc">
										<label for="tanggal_barang_asc" role="button">
											<i class="fas small fa-arrow-up" :class="order_tanggal == 'asc' ? 'text-primary' : ''"></i>
										</label>
									</div>
									<div>
										<input  @change="filterSearch()" type="radio" name="tanggal_barang" class="form-check" value="desc" v-model="order_tanggal" style="appearance: none" id="tanggal_barang_desc">
										<label for="tanggal_barang_desc" role="button">
											<i class="fas small fa-arrow-down" :class="order_tanggal == 'desc' ? 'text-primary' : ''"></i>
										</label>
									</div>
								</div>
							</div>
						</th>
						<th>Aksi</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in data" :key="item.id">
						<td>{{ index + 1 }}</td>
						<td>{{ item.barang.name }}</td>
						<td>{{ item.stok }}</td>
						<td>{{ item.terjual }}</td>
						<td>{{ dayjs(item.updated_at).format('DD-MM-YYYY') }}</td>
						<td>
							<button class="btn btn-sm btn-primary mb-1" v-on:click="edit(item)">
								<i class="fas fa-fw fa-book"></i>
								Edit
							</button>

							<button class="d-inline-block btn btn-sm btn-danger mb-1" type="submit" v-on:click="destroy(item.id)">
								<i class="fas fa-fw fa-trash"></i>
								Hapus
							</button>
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
	<div class="card mt-3 mb-5">
		<div class="card-body">
			<div class="d-flex justify-content-start">
				<div class="form-group mr-2">
					<label>From</label>
					<input  @change="filterCount()" type="date" v-model="from_count" class="form-control">
				</div>
				<div class="form-group">
					<label>To</label>
					<input  @change="filterCount()" type="date" v-model="to_count" class="form-control">
				</div>
			</div>
			<table id="example" class="table table-striped table-bordered" style="width:100%">
				<thead>
					<tr>
						<th>No</th>
						<th>Jenis Barang</th>
						<th>Jumlah Transaksi</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="(item, index) in jenisses" :key="item.id">
						<td>{{ index + 1 }}</td>
						<td>{{ item.name }}</td>
						<td>{{ item.transaksis_count }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>

<script>
	import Create from './Create';
	import Edit from './Edit';

	export default {
		data: () => ({
			data: [],
			order_barang: '',
			order_tanggal: '',
			tanggal_transaksi: '',
			nama_barang: '',
			jenisses: [],
			from_count: '',
			to_count: '',
			transaksiEdit: {}
		}),
		components: {
			Create,
			Edit,
		},
		mounted() {
			window.axios.get('transaksi').then((e) => {
				this.data = e.data.data;
			})

			window.axios.get('transaksis/detail').then((e) => {
				this.jenisses = e.data;
				console.log(e.data)
			})
		},
		methods: {
			dayjs: window.dayjs,
			destroy(id) {
				if (confirm('Yakin ingin dihapus?'))
				{
					window.axios.delete(`transaksi/${id}`).then(() => window.location.reload());
				}
			},
			modalCreate() {
				window.$('#modal-create').modal()
			},
			filterSearch() {
				let search = {}

				if (this.nama_barang.length > 0) {
					search['nama_barang'] = this.nama_barang;
				}

				if (this.tanggal_transaksi.length > 0) {
					search['tanggal_transaksi'] = this.tanggal_transaksi;
				}

				if (this.order_barang.length > 0) {
					search['order_barang'] = this.order_barang;
				}

				if (this.order_tanggal.length > 0) {
					search['order_tanggal'] = this.order_tanggal;
				}

				window.axios.get('transaksi', {params: search}).then((e) => {
					this.data = e.data.data;
				})
			},
			filterCount() {
				let search = {}

				if (this.from_count.length > 0) {
					search['from'] = this.from_count;
				}

				if (this.to_count.length > 0) {
					search['to'] = this.to_count;
				}

				window.axios.get('transaksis/detail', {params: search}).then((e) => {
					this.jenisses = e.data;
				})
			},
			edit(item) {
				this.transaksiEdit = item;
				window.$('#modal-edit').modal()
			}
		},
	}
</script>