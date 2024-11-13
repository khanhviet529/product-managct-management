// const { populate } = require("../../../models/product.model");

//BUTOON Status
const buttonStatus = document.querySelectorAll('[button-status]');
console.log(buttonStatus);
buttonStatus.forEach((button) => {
  button.addEventListener('click', (e) => {
    const url = new URL(window.location.href);
    const value = e.target.getAttribute('button-status');
    // console.log(value);
    if (value) {
      url.searchParams.set('status', value);
    } else {
      url.searchParams.delete('status');
    }
    url.searchParams.delete('page');
    window.location.href = url.href;
  });
});
// END BUTOON Status

//SEARCH PRODUCT
const searchProduct = document.querySelector('#form-search');
// console.log(searchProduct);
if (searchProduct) {
  searchProduct.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e);
    console.log("submit");
    const url = new URL(window.location.href);
    const search = (e.target.elements.keyword.value).trim("");
    if (search) {
      url.searchParams.set('keyword', search);
    }
    else {
      url.searchParams.delete('keyword');
    }
    window.location.href = url.href;
  });
}

//SEARCH PRODUCT

//PAGINATION
const pageNumber = document.querySelectorAll('[page-number]');
// console.log(pageNumber);
pageNumber.forEach((page) => {
  page.addEventListener('click', (e) => {
    const url = new URL(window.location.href);
    let number = e.target.getAttribute('page-number');
    if (number) {
      url.searchParams.set('page', number);
    }
    else {
      url.searchParams.delete('page');
    }
    window.location.href = url.href;
  });
});
// END PAGINATION

// Product Status
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.getElementById("form-change-status");
if (formChangeStatus) {
  const path = formChangeStatus.getAttribute("path");
}

buttonChangeStatus.forEach((button) => {
  button.addEventListener('click', () => {
    console.log(button);
    const dataId = button.getAttribute('data-id');
    const dataStatus = button.getAttribute('data-status');
    // console.log("id: " + dataId);
    // console.log("statsu: " + dataStatus);
    const status = dataStatus == 'true' ? 'inactive' : 'active';

    formChangeStatus.action = path + `${status}/${dataId}?_method=PATCH`;
    formChangeStatus.submit();
  })
})

// End Product Status

// check Multi  
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputsCheckedAll = checkboxMulti.querySelector(
    "input[name='checkAll']"
  );
  const inputsId = checkboxMulti.querySelectorAll(
    "input[name='id']"
  );

  inputsCheckedAll.addEventListener("click", () => {
    if (inputsCheckedAll.checked) {
      inputsId.forEach(input => input.checked = true);
    }
    else {
      inputsId.forEach(input => input.checked = false);
    }
  })

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      if (input.checked) {
        const countInput = (checkboxMulti.querySelectorAll("input[name='id']:checked")).length;
        if (countInput === inputsId.length) {
          inputsCheckedAll.checked = true;
        }
      } else {
        inputsCheckedAll.checked = false;
      }
    });
  });
}

// End  check Multi  


// Form change status  
const formChangeMulti = document.querySelector("[form-change-multi]");
if (formChangeMulti) {
  const inputsIds = formChangeMulti.querySelector("input[name='ids']");
}
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();
    const type = e.target.elements.type.value;
    if (type === "deleteMulti") {
      let isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
      if (!isConfirm) {
        return;
      }
    }


    const inputsChecked = checkboxMulti.querySelectorAll("input[name='id']:checked");

    if (inputsChecked.length > 0) {
      let ids = [];
      inputsChecked.forEach((input) => {
        if (type === "changePosition") {
          const inputPosition = input.closest("tr").querySelector("input[change-position]");
          let changePosition = `${input.value}-${inputPosition.value}`;
          ids.push(changePosition);
        }
        else {
          ids.push(input.value);
        }
      })
      inputsIds.value = ids.join(", ");
      console.log(inputsIds.value);
      formChangeMulti.submit();
    }
    else {
      alert("Vui lòng chọn sản phẩm cần thay đổi trạng thái");
    }

  });
}
// End form change status  

// Form delete
const btnDelete = document.querySelectorAll("[button-delete]");
const formDelete = document.getElementById("form-delete");
if (formDelete) {
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", () => {
      let isConfirm = confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
      if (isConfirm) {
        const dataId = btn.getAttribute('data-id');
        const path = formDelete.getAttribute('path');
        formDelete.action = path + dataId + "?_method=DELETE";
        formDelete.submit();
      }
    })
  });
}


//End Form delete



// Show Alert
const showAlert = document.querySelector("[show-alert]");
if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

// preview image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage){
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const previewImage = uploadImage.querySelector("[preview-image]");
  const uploadImageEdit = document.querySelector("[upload-image-edit]");
  const displayClost = document.querySelector("span[close-image]");

  if(uploadImageEdit){
    displayClost.className =  "display-close";
  }

  uploadImageInput.addEventListener("change" , (evt) => {
    displayClost.className =  "display-close";
    console.log(evt.target.files);
    const [file] = evt.target.files
    if (file) {
      previewImage.src = URL.createObjectURL(file)
    }
  }) 
}

// end preview image

// close preview image
const closeImage = document.querySelector("[close-image]");
closeImage.addEventListener("click" , () => {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const previewImage = uploadImage.querySelector("[preview-image]");
  uploadImageInput.value = "";
  previewImage.src = "";
  const displayClost = document.querySelector("span[close-image]");
  displayClost.className  = "";
})
// End close preview image

//Set value input(type=file) when edit
        // const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
        // console.log(uploadImageInput.files);
        // const previewImage = uploadImage.querySelector("[preview-image]");
        // // Create a new File object
        // if(uploadImageInput){
        //   const value = uploadImageInput.getAttribute("data-value");
        //   console.log(value);
        //   const myFile = new File(['Hello World!'], value, {
        //     type: 'image/jpeg',
        //     // lastModified: new Date(),
        // });
        // // Now let's create a DataTransfer to get a FileList
        // const dataTransfer = new DataTransfer();
        // // console.log(myFile.name.split("-"));
        // // myFile.name = myFile.name.split("-").pop();
        // dataTransfer.items.add(myFile);
        // uploadImageInput.files = dataTransfer.files;
        // // previewImage.src = URL.createObjectURL(myFile);
        // }

      
//End Set value input(type=file) when edit


