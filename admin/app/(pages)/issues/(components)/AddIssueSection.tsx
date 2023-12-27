// 'use client'

// import useLocalStorage from '@admin/app/(hooks)/useLocalStorage '
// import { Accordion, AccordionItem } from '@nextui-org/react'
// import { createSlug } from 'admin/app/(utils)/createSlug'
// import { trpc } from 'admin/app/(utils)/trpc/client'
// import { useRouter } from 'next/navigation'
// import toast from 'react-hot-toast'
// import { IoMdAddCircle } from 'react-icons/io'

// import SendButton from '../../(components)/SendButton'

// const AddIssueSection = () => {
//   const router = useRouter()

//   const [contentTitle, setContentTitle] = useLocalStorage<string>(
//     'addIssueTitle',
//     '',
//   )

//   const [contentSlug, setContentSlug] = useLocalStorage<string>(
//     'addIssueSlug',
//     '',
//   )

//   const [contentIssuePrice, setContentIssuePrice] = useLocalStorage<string>(
//     'addIssuePrice',
//     '',
//   )

//   const clearState = () => {
//     setContentTitle('')
//     setContentSlug('')
//     setContentIssuePrice('')
//   }

//   const addIssue = trpc.issues.create.useMutation({
//     onSuccess: () => {
//       toast.success(`Послугу додано!`, {
//         style: {
//           borderRadius: '10px',
//           background: 'grey',
//           color: '#fff',
//         },
//       })
//       clearState()
//       router.refresh()
//     },
//   })

//   const handleSubmit = async (e: any) => {
//     e.preventDefault()

//     try {
//       if (!(contentTitle && contentIssuePrice && contentSlug)) {
//         toast.error(`Всі поля повинні бути заповнені...`, {
//           style: {
//             borderRadius: '10px',
//             background: 'grey',
//             color: '#fff',
//           },
//         })
//         return
//       }
//       addIssue.mutate({
//         slug: contentSlug,
//         title: contentTitle,
//         price: contentIssuePrice,
//         image_id: '6528fcd9458999afd6a05bfc',
//         metadata: {
//           title: '1',
//           description: '1',
//           keywords: '1',
//         },
//         description: '',
//         info: '',
//         benefits_ids: [],
//         gadgets_ids: [],
//       })
//     } catch (error) {
//       console.error('Error:', error)
//       toast.error(`Помилка сервера...`, {
//         style: {
//           borderRadius: '10px',
//           background: 'grey',
//           color: '#fff',
//         },
//       })
//     }
//   }

//   return (
//     <Accordion
//       itemClasses={{ base: 'border-white-dis ' }}
//       variant='bordered'
//       className=' shadow-2xl'
//     >
//       <AccordionItem
//         textValue='1'
//         key='1'
//         startContent={<IoMdAddCircle size={40} color='#fff' fill='#fff' />}
//         title={
//           <span className='font-exo_2 text-white-dis text-center text-2xl font-bold'>
//             Додати послугу
//           </span>
//         }
//       >
//         <div className='container  flex flex-col items-center  gap-[60px] px-4 transition-all duration-300  ease-in-out'>
//           <form className='text-white-dis flex w-full items-end justify-evenly gap-3 '>
//             <div className='flex w-full flex-col gap-8'>
//               <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
//                 Заголовок
//                 <input
//                   required
//                   className='font-base text-md text-black-dis h-[45px] w-full indent-3'
//                   type='text'
//                   name='title'
//                   value={contentTitle}
//                   onChange={e => {
//                     setContentSlug(createSlug(e.target.value))
//                     setContentTitle(e.target.value)
//                   }}
//                 />
//               </label>
//               <label className='font-exo_2  flex flex-col gap-1 text-center text-xl'>
//                 Slug
//                 <input
//                   required
//                   className='font-base text-md text-black-dis h-[45px] w-full indent-3'
//                   type='text'
//                   name='slug'
//                   value={contentSlug}
//                   onChange={e => {
//                     setContentSlug(e.target.value)
//                   }}
//                 />
//               </label>
//               <label className='font-exo_2  flex flex-col items-start gap-1 text-center text-xl'>
//                 Вартість послуги
//                 <input
//                   required
//                   className='font-base text-md text-black-dis h-[45px] w-[300px] indent-3'
//                   type='text'
//                   name='price'
//                   value={contentIssuePrice}
//                   onChange={e => setContentIssuePrice(e.target.value)}
//                 />
//               </label>
//             </div>
//           </form>
//           <div className='mb-8'>
//             <SendButton handleSubmit={handleSubmit} />
//           </div>
//         </div>
//       </AccordionItem>
//     </Accordion>
//   )
// }

// export default AddIssueSection
