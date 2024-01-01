
import {ImFacebook2 ,ImTwitter, ImPinterest} from 'react-icons/im'
import {GrInstagram} from 'react-icons/gr'

export default  function Social() {
  return (
    <>
        <div >
            <h1 className='font-bold text-center sm:text-center md:center'>Follow</h1>
            <div className='flex gap-4 py-4 justify-center mt-1'>
                <ImFacebook2 size={24}/>
                <ImTwitter size={24}/>
                <ImPinterest size={24}/>
                <GrInstagram size={24}/>
            </div>
        </div>
    </>
  )
}
