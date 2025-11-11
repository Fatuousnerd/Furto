import { ShoppingBasketRounded } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import axiosInstance from '../api/axiosInstance';
import { Link } from 'react-router-dom';

const Shop = () => {
    const [prods, setProd] = useState<Array<any> | null>(null);
    const user = JSON.parse(localStorage.getItem('user') || '');
    
    const handleFetch = async () => {
        try {
            const res = await axiosInstance.get(`/shop/products`);
            // console.log(res?.data?.shop);
            setProd(res?.data?.shop);
        } catch (err: any) {
            console.error(err?.response?.data?.error);
        }
    };

    useEffect(() => {
        handleFetch();
    }, []);

    const handleAdd = async (productId: string) => {
        try {
            const userId = user?._id;
            const res = await axiosInstance.post('/shop/cart-add', { productId, userId });
        } catch (err: any) {
            console.error(err?.response?.data?.error);
        }
    };

    if (!Array.isArray(prods) || prods.length === 0) return <div className='w-full h-screen flex items-center justify-center bg-emerald-300 '>No products available</div>;
    // console.log('User', user);
    return (
        <>
            <div className="w-full h-screen flex flex-col bg-gradient-to-tr from-indigo-50 to-indigo-200 text-slate-900 overflow-hidden">

                <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-3 bg-white/60 backdrop-blur-md shadow-sm">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-indigo-600 flex items-center justify-center text-white font-bold">
                            F
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold">Furto</h1>
                            <p className="text-xs text-slate-600">Quality goods</p>
                        </div>
                    </div>

                    <div className="flex-1 max-w-xl mx-4">
                        <label htmlFor="shop-search" className="sr-only">Search products</label>
                        <div className="relative">
                            <input
                                id="shop-search"
                                type="search"
                                placeholder="Search products, e.g. sneakers, jackets..."
                                className="w-full rounded-full border border-slate-200 py-2 px-4 pr-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
                                aria-label="Search products"
                            />
                            <svg className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M16.65 11A5.65 5.65 0 1 1 5.35 11a5.65 5.65 0 0 1 11.3 0z" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="text-sm text-slate-700">Hello, {user?.username}</div>
                        <Link to={'/cart'} aria-label="Open cart" className="relative inline-flex items-center gap-2 bg-indigo-600 text-white px-3 py-2 rounded-lg shadow hover:bg-indigo-700 transition">
                            <ShoppingBasketRounded />
                            <span className="text-sm font-semibold">Cart</span>
                            {Array.isArray(user?.cart) &&
                                <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white bg-rose-500 rounded-full">
                                    {user?.cart?.length}
                                </span>
                            }
                        </Link>
                    </div>
                </header>

                <main className="flex-1 overflow-auto px-6 py-8 nobar overflow-y-scroll ">
                    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-h-[500px] nobar ">
                        {prods.map((item, idx) => {
                            const key = item?.prodId ?? item?.id ?? idx;
                            const price = Number(item?.price);
                            const formattedPrice = Number.isFinite(price)
                                ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price)
                                : '-';
                            return (
                                <article key={key} className="bg-white/95 rounded-xl shadow-md hover:shadow-xl overflow-hidden transition transform hover:-translate-y-1 h-max ">
                                    <div className="w-full h-32 bg-slate-100 overflow-hidden">
                                        <img
                                            src={item?.image || ''}
                                            alt={item?.name || 'Product'}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    <div className="p-4 flex flex-col gap-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <h2 className="text-lg font-semibold leading-snug">{item?.name}</h2>
                                                <p className="text-xs text-slate-500 mt-1">{item?.category || ''}</p>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-xl font-bold text-indigo-700">{formattedPrice}</div>
                                                <div className="text-xs text-slate-500">{item?.unit || ''}</div>
                                            </div>
                                        </div>

                                        <p className="text-sm text-slate-600 line-clamp-3">
                                            {item?.desc || 'No description provided.'}
                                        </p>

                                        <div className="mt-2 flex items-center justify-between gap-3">
                                            <button type="button" onClick={() => handleAdd(item?._id)} aria-label={`Add ${item?.name} to cart`} className="flex-1 flex justify-center items-center gap-2 px-3 py-2 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition">
                                                <ShoppingBasketRounded fontSize="small" />
                                                Add to cart
                                            </button>

                                            {/* <button type="button" aria-label={`View details for ${item?.name}`} className="px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50 transition">View</button> */}
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </section>
                </main>

                <footer className="py-4 bg-indigo-700 text-white text-center">
                    <div className="max-w-4xl mx-auto px-4">
                        <p className="text-sm">© {new Date().getFullYear()} Furto Shop — Built with care</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Shop