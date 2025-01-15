// 'use client';

// import { useEffect } from 'react';
// import { IoClose } from 'react-icons/io5';
// import { CategoriesList } from '@/lib/categoriesList';

// interface FilterSidebarProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onTagChange: (id: string) => void;
//   onResetFilter: () => void;
//   selectedCategory: string;
// }

// const FilterSidebar = ({
//   isOpen,
//   onClose,
//   onTagChange,
//   onResetFilter,
//   selectedCategory,
// }: FilterSidebarProps) => {
//   const { queueData: categories, isLoading } = CategoriesList(1, 'document', 0);

//   // Prevent scroll when modal is open on mobile
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'unset';
//     }
//     return () => {
//       document.body.style.overflow = 'unset';
//     };
//   }, [isOpen]);

//   return (
//     <>
//       {/* Desktop Sidebar */}
//       <div className="hidden lg:block w-72 ">
//         <div className="bg-primary-500 text-white shadow-sm p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-lg font-semibold">Danh Mục</h2>
//             <button
//               onClick={onResetFilter}
//               className="text-14 bg-primary-600 p-2 rounded-md hover:text-yellow-300"
//             >
//               Đặt lại
//             </button>
//           </div>
//           <div className="space-y-2">
//             {isLoading
//               ? Array(5)
//                   .fill(0)
//                   .map((_, i) => (
//                     <div
//                       key={i}
//                       className="animate-pulse h-10 bg-gray-100 rounded-lg"
//                     />
//                   ))
//               : categories?.map((category: any) => (
//                   <button
//                     key={category.id}
//                     onClick={() => onTagChange(category.id)}
//                     className={`w-full text-left bg-primary-500 px-4 py-2 rounded-lg transition-colors ${
//                       selectedCategory === category.id
//                         ? 'bg-primary-50 text-primary-600'
//                         : 'hover:text-yellow-500'
//                     }`}
//                   >
//                     {category.name}
//                   </button>
//                 ))}
//           </div>
//         </div>
//       </div>

//       {/* Mobile Filter Modal */}
//       <div
//         className={`lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${
//           isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
//         }`}
//         onClick={onClose}
//       >
//         <div
//           className={`absolute right-0 top-0 h-full w-80 bg-white transform transition-transform ${
//             isOpen ? 'translate-x-0' : 'translate-x-full'
//           }`}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <div className="p-4">
//             <div className="flex justify-between items-center mb-4">
//               <h2 className="text-24 font-semibold">Danh Mục</h2>
//               <button onClick={onClose} className="p-2">
//                 <IoClose className="text-xl" />
//               </button>
//             </div>
//             <button
//               onClick={() => {
//                 onResetFilter();
//                 onClose();
//               }}
//               className="w-max mb-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
//             >
//               Đặt lại
//             </button>
//             <div className="space-y-2">
//               {categories?.map((category: any) => (
//                 <button
//                   key={category.id}
//                   onClick={() => onTagChange(category.id)}
//                   className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
//                     selectedCategory === category.id
//                       ? 'bg-primary-50 text-primary-600'
//                       : 'hover:bg-gray-50'
//                   }`}
//                 >
//                   {category.name}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;
