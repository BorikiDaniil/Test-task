import React, {useState, useEffect, useMemo} from "react";
import {useParams} from "react-router-dom";
import moment from 'moment';
import {useHistory} from "react-router-dom";
import {useDispatch, useStore} from "react-redux";
import {getProducts} from "../../redux/actions/productsActions";
import axios from "axios";

const url = process.env.REACT_APP_BD_URL

export const ProductSettings = () => {
  const [isAdd, setResult] = useState(false)
  const [errors, addError] = useState({})
  const [isImage, setIsImageValue] = useState(false)
  const [product, setProductProp] = useState({
    title: '',
    description: '',
    price: '',
    discount:'',
    end_date_discount: '',
    image: null
  })

  const params = useParams();
  const history = useHistory()

  const storage = useStore()
  const dispatch = useDispatch()


  useMemo(() => {
    if(!localStorage.getItem('token')) history.push('/login')
  },[]);

  useEffect(() => {
    params.id !== 'new' ? getProduct() :
        setProductProp({
          title: '',
          description: '',
          price: '',
          discount:'',
          end_date_discount: '',
          image: null
        })
    setResult(false)
    addError({})
  },[params.id]);

  const getProduct = async () => {
    const id = params.id
    await dispatch(getProducts())
    const productsList = storage.getState().booking.products
    const currentProduct = productsList.find(product => product.id == id )
    await setProductProp(product => {
      product = currentProduct
      return product
    })
    setIsImageValue(true)
  };

  const changeProps = async(e, prop) => {
    const value = e.target.value
    await setProductProp((product) => {
      const newProduct = product
      newProduct[prop] = value
      return newProduct
    })
  };

  const handleImageChange = async (e) => {
    let reader = new FileReader()
    let file = e.target.files[0]

    if (file) {
      const localImageUrl = URL.createObjectURL(file)
      const imageObject = new window.Image()
      imageObject.onload = async () => {
        file.width = imageObject.naturalWidth
        file.height = imageObject.naturalHeight
        URL.revokeObjectURL(file)
        addError((errors) => {
          const newError = errors
          newError.image = !!(file.width < 200 || file.height < 200 || file.width > 4000 || file.height > 4000)
          return newError
        })
      }
      imageObject.src = localImageUrl
    }

    await setIsImageValue(false)

    reader.onloadend = async () => {
      await setProductProp((product) => {
        const newProduct = product
        newProduct.image = {
          file: file,
          imagePreviewUrl: reader.result,
        }
        return newProduct
      })
      setIsImageValue(!!(product.image && product.image.imagePreviewUrl))
    }
    reader.readAsDataURL(file)

  };

  const todayDate = () => {
    return moment().format("YYYY-MM-DD")
  };

  const hasError = (key) => {
    return errors[key]
  }

  const submit = async (e) => {
    e.preventDefault()
    const productsErrors = {}

    productsErrors.title = (!product.title || product.title.length > 60 || product.title.length < 20)
    productsErrors.price = (!product.price || product.price < 0 || product.price > 99999999.99)
    productsErrors.discount = (product.discount && (product.discount < 10 || product.discount > 90))
    productsErrors.description = (product.description && product.description.length > 200)
    productsErrors.date = (product.discount && !product.end_date_discount)
    productsErrors.image = (!product.image || errors.image)

    await addError((errors) => {
      return Object.assign({}, productsErrors)
    })

    let currentErrors = Object.values(productsErrors).filter(error => error === true)

    if(!currentErrors.length) {
      setResult(true)
      try {
        params.id === 'new' ? await axios.post(`${url}/products.json`, product) :
            await axios.patch(`${url}/products/${params.id}.json`, product)
        setResult(true)
      }
      catch (e) {
        console.log(e)
      }
    }
  };


  return <form className="needs-validation">
    { isAdd && params.id === 'new' ? <div className="alert alert-success" role="alert">
      Product has been saved
    </div> : <></>}
    <div className="form-group" >
      <label htmlFor="title">Title</label>
      <input
          type="text"
          className={
          hasError("title")
                ? "form-control is-invalid"
                : "form-control"
            }
          id="title"
          defaultValue={product.title}
          placeholder="Title"
          aria-describedby="inputGroupPrepend"
          onChange={e => changeProps(e, 'title')}
      />
      <div
          className={
            hasError("title") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter a title 20-60 characters
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="description">Description</label>
      <textarea
          className={
            hasError("description")
                ? "form-control is-invalid"
                : "form-control"
          }
          id="description"
          rows="3"
          defaultValue={product.description}
          onChange={e => changeProps(e, 'description')}
      >
      </textarea>
      <div
          className={
            hasError("description") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter a description less than 200 characters
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="price">Price</label>
      <input
          type="number"
          className={
            hasError("price")
                ? "form-control is-invalid"
                : "form-control"
          }
          id="price"
          placeholder="0"
          defaultValue={product.price}
          onChange={e => changeProps(e, 'price')}
      />
      <div
          className={
            hasError("price") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter a price 0-99999999.99
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="discount">Discount %</label>
      <input
          type="number"
          className={
            hasError("discount")
                ? "form-control is-invalid"
                : "form-control"
          }
          id="discount"
          placeholder="0"
          defaultValue={product.discount}
          onChange={e => changeProps(e, 'discount')}
      />
      <div
          className={
            hasError("discount") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter a discount 10-90
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="inputDate">Expiration date of the discount</label>
      <input
          type="date"
          className={
            hasError("date")
                ? "form-control is-invalid"
                : "form-control"
          }
          defaultValue={product.end_date_discount}
          onChange={e => changeProps(e, 'end_date_discount')}
          min={todayDate()}
      />
      <div
          className={
            hasError("date") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter the expiration date of the discount
      </div>
    </div>
    <div className="form-group">
      <label htmlFor="exampleFormControlFile1">Example file input</label>
      <input
          type="file"
          className={
            hasError("image")
                ? "form-control is-invalid"
                : "form-control"
          }
          id="exampleFormControlFile1"
          onChange={(e)=>handleImageChange(e)}
      />
      <div
          className={
            hasError("image") ? "invalid-feedback" : "d-none"
          }
      >
        Please enter a image witch width/height less than 4000px and more than 200px
      </div>
      {
        isImage && product.image && product.image.imagePreviewUrl ? <div className="imgPreview">
              <img src={product.image.imagePreviewUrl} alt='image' />
        </div> :
        <div className="previewText">Please select an Image for Preview</div>
      }
    </div>
      <button
        className="btn btn-success"
        onClick={e => submit(e)}
      >Add product
  </button>
  </form>
};