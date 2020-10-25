$( document ).ready(function() {
	toastr.options = {
		"closeButton": true,
		"debug": false,
		"newestOnTop": false,
		"progressBar": false,
		"positionClass": "toast-top-center",
		"preventDuplicates": false,
		"onclick": null,
		"showDuration": "300",
		"hideDuration": "1000",
		"timeOut": "3000",
		"extendedTimeOut": "1000",
		"showEasing": "swing",
		"hideEasing": "linear",
		"showMethod": "fadeIn",
		"hideMethod": "fadeOut"
	}
	
	$('.btn-kill').on('click', function () {
		let pid = this.dataset.pid;
		$.ajax({
			type: "POST",
			url: '/killById',
			data: {
				pid
			},
			success: (data)=>{
				console.log(data);
				if(data.code == 1) {
					$(`#${pid}`).remove();
					toastr.success('Kill Success!', 'Notifycation')
				}
			},
			dataType: 'json'
		});
	});

	$('.btn-kill-all').on('click', function () {
		$.ajax({
			type: "POST",
			url: '/killAll',
			data: {},
			success: (data)=>{
				console.log(data);
				if(data.code == 1) {
					$(`#tableBody`).html('');
					toastr.success('Kill All Success!', 'Notifycation')
				}
			},
			dataType: 'json'
		});
	});

	$('.btn-run-command').on('click', function () {
		const command = $('#command').val();
		if (!command)
			return toastr.error('Input command first', 'ERROR');
		$.ajax({
			type: "POST",
			url: '/runCommand',
			data: {
				command
			},
			success: (data)=>{
				console.log(data);
				if(data.code == 1) {
					toastr.success('Run command Success', 'Notifycation')
				} else {
					toastr.error(data.message, 'ERROR');
				}
			},
			dataType: 'json'
		});
  });
  
  $('.btn-set-excluded').on('click', function () {
		const keyList = $('#keyList').val();		
		$.ajax({
			type: "POST",
			url: '/setExcludedList',
			data: {
				keyList
			},
			success: (data)=>{
				console.log(data);
				if(data.code == 1) {
					toastr.success('Set Key Excluded Success', 'Notifycation')
				} else {
					toastr.error(data.message, 'ERROR');
				}
			},
			dataType: 'json'
		});
	});

	$('.btn-set-pin').on('click', function () {
		const keyList = $('#keyPinList').val();		
		$.ajax({
			type: "POST",
			url: '/setPinList',
			data: {
				keyList
			},
			success: (data)=>{
				console.log(data);
				if(data.code == 1) {
					toastr.success('Set PIN league Success', 'Notifycation')
				} else {
					toastr.error(data.message, 'ERROR');
				}
			},
			dataType: 'json'
		});
	});

	$('.btn-reload').on('click', function () {
		window.location.reload();
	});
});