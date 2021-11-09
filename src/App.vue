<template>
	<div id="wrapper">
		<ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled" id="accordionSidebar">
			<a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
				<div class="sidebar-brand-icon rotate-n-15">
					<i class="fas fa-file"></i>
				</div>
				<div class="sidebar-brand-text mx-3">Laravel</div>
			</a>

			<hr class="sidebar-divider my-0">

			<hr class="sidebar-divider">

			<div class="sidebar-heading">
				Pengelolaan
			</div>
			<li class="nav-item {{ request()->routeIs('admin.jenis.*') ? 'active' : '' }}">
				<router-link to="/jenis" class="nav-link">
					<i class="fas fa-fw fa-book"></i>
					<span>Kelola Jenis Barang</span>
				</router-link>
			</li>
			<li class="nav-item {{ request()->routeIs('admin.barang.*') ? 'active' : '' }}">
				<router-link to="/barang" class="nav-link">
					<i class="fas fa-fw fa-book"></i>
					<span>Keloa Barang</span>
				</router-link>
			</li>
			<li class="nav-item {{ request()->routeIs('admin.transaksi.*') ? 'active' : '' }}">
				<router-link to="/transaksi" class="nav-link">
					<i class="fas fa-fw fa-book"></i>
					<span>Kelola Transaksi</span>
				</router-link>
			</li>

			<hr class="sidebar-divider">

			<div class="text-center d-none d-md-inline">
				<button class="rounded-circle border-0" id="sidebarToggle"></button>
			</div>
		</ul>

		<div id="content-wrapper" class="d-flex flex-column">
			<div id="content">
				<nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
					<button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
						<i class="fa fa-bars"></i>
					</button>
					<ul class="navbar-nav ml-auto">

					</ul>
				</nav>
				<div class="container-fluid">
					<div class="d-sm-flex align-items-center justify-content-between mb-4">
						<h1 class="h3 mb-0 text-gray-800">
							<!-- @yield('content_header') -->
						</h1>
					</div>
					<router-view/>
				</div>
			</div>
		</div>
	</div>
</template>