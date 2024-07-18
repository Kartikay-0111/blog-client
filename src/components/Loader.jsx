import { SyncLoader } from 'react-spinners'
let LoaderSpinner = ({isPage}) => {
    return (
        <div className='blbox flex flex-col items-center justify-center pt-8'>
            {isPage && <div><SyncLoader color="#f8110d" /></div>}
            {!isPage && 
            <div className='flex flex-col items-center'>
                <div className='loader'></div>
                <p className=" text-rose-700 font-bold text-4xl mt-4" >Ruko zara Sabar karo😉</p>
            </div> }
        </div>
    )
}
export default LoaderSpinner