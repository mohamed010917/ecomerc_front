"use client"; 
export default function Fotter() {
    return(
     <div className=" min-h-[400px] flex-wrap w-full p-10 flex justify-between gap-4 items-start text-white" style={{ 
                     backgroundImage: `url("/website/footer-pattern.jpg")`, 
                     backgroundRepeat: "no-repeat",
                     backgroundSize: "cover",
                     backgroundPosition: "bottom"
                 }}>
    <div className="logo">
        <div className="logo items-center flex  gap-2 p-2 ">
            {/* <img className='w-10 h-10 ' src={image} alt="logo" /> */}
            <span className='text-2xl font-bold'>Shopsy</span>
        </div>
        <p className="w-[250px]"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum in beatae ea recusandae blanditiis veritatis.</p>
    </div>
    <div className="links flex flex-col gap-4">
        <h1>important Links</h1>
        <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>Contacts</li>
        </ul>
    </div>
    <div className="links flex flex-col gap-4">
        <h1> Links</h1>
        <ul className="flex flex-col gap-2">
            <li>Home</li>
            <li>Products</li>
            <li>Services</li>
            <li>Contacts</li>
        </ul>
    </div>
    <div className="links flex flex-col gap-4">
        <h1> connect</h1>
        <ul className="flex flex-col gap-2">
            <li>phone : 0101010101</li>
            <li>email : mohamed@gmail.com</li>
            <li>mohamed Halawa</li>
            <li className="text-gray-600 dark:text-gray-300">&copy; 2025 Copyright</li>
        </ul>
    </div>

     </div>
    )
}