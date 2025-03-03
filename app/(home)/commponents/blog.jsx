
export default function Blog(){

    return(
        <div className="flex gap-4 p-6 mt-4 mb-4 flex-wrap justify-between items-center">
            <div className="card w-[400px] shadow rounded-2xl">
                <div className="w-full h-[200px] rounded-2xl overflow-hidden group">

                <img src={'/blogs/blog-1.jpg'} alt="" className="w-full h-full transition-transform duration-300 group-hover:scale-110"/>
                </div>
                <div className="text p-2">
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                    <h1 className="text-gray-950 dark:text-white text-xl mt-4 mb-4">How to choose perfect smartwatch</h1>
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                </div>
            </div>
            <div className="card w-[400px] shadow rounded-2xl">
                <div className="w-full h-[200px] rounded-2xl overflow-hidden group">

                <img src={'/blogs/blog-2.jpg'} alt="" className="w-full h-full transition-transform duration-300 group-hover:scale-110"/>
                </div>
                <div className="text p-2">
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                    <h1 className="text-gray-950 dark:text-white text-xl mt-4 mb-4">How to choose perfect smartwatch</h1>
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                </div>
            </div>
            <div className="card w-[400px] shadow rounded-2xl">
                <div className="w-full h-[200px] rounded-2xl overflow-hidden group">

                <img src={'/blogs/blog-3.jpg'} alt="" className="w-full h-full transition-transform duration-300 group-hover:scale-110"/>
                </div>
                <div className="text p-2">
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                    <h1 className="text-gray-950 dark:text-white text-xl mt-4 mb-4">How to choose perfect smartwatch</h1>
                    <p className="text-gray-700 dark:text-gray-200">Jan 20, 2024 by Dilshad</p>
                </div>
            </div>

        </div>
    )
}