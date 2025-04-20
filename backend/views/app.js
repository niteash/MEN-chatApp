const Swal = require('sweetalert2')

function confirmDelete(chatId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`/chats/${chatId}`, {
          method: 'DELETE'
        }).then(response => {
          if (response.redirected) {
            window.location.href = response.url;
          } else {
            location.reload();
          }
        });
      }
    });
  }