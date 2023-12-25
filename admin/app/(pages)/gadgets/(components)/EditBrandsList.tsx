import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'

import { DraggableBrandItem } from './DraggableBrandItem'

interface IBrandsProps {
  newGadgetData: Gadget
  brandsData: Brand[]
  setNewGadgetData: (data: Gadget) => void
}

const EditBrandsList: React.FC<IBrandsProps> = ({
  brandsData,
  newGadgetData,
  setNewGadgetData,
}) => {
  const [filteredBrandsData, setFilteredBrandsData] = useState<Brand[]>(
    brandsData.filter(
      item => !newGadgetData.brands.some(brand => brand.id === item.id),
    ),
  )

  const handleAddBrandItemClick = (item: Brand) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedBrandsArray = [...newGadgetData.brands]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedBrandsArray.findIndex(
      selectedBrand => selectedBrand.id === item.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedBrandsArray.push(item)
    } else {
      updatedSelectedBrandsArray.splice(index, 1)
    }

    // Update the state with the new array
    setNewGadgetData({
      ...newGadgetData,
      brands: updatedSelectedBrandsArray,
    })

    // Remove the selected item from the filteredBrandsData array
    setFilteredBrandsData(prevFilteredBrandsData =>
      prevFilteredBrandsData.filter(
        filteredBrand => filteredBrand.id !== item.id,
      ),
    )
  }

  const handleRemoveBrandItemClick = (clickedBrand: Brand) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedBrandsArray = [...newGadgetData.brands]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedBrandsArray.findIndex(
      selectedBrand => selectedBrand.id === clickedBrand.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedBrandsArray.push(clickedBrand)
    } else {
      updatedSelectedBrandsArray.splice(index, 1)
    }

    // Remove the selected item from the filteredBrandsData array
    setFilteredBrandsData(prevFilteredBrandsData =>
      prevFilteredBrandsData.filter(
        filteredBrand => filteredBrand.id !== clickedBrand.id,
      ),
    )

    setNewGadgetData({
      ...newGadgetData,
      brands: updatedSelectedBrandsArray,
    })

    setFilteredBrandsData(
      brandsData.filter(
        item =>
          !updatedSelectedBrandsArray.some(
            selectedBrand => selectedBrand.id === item.id,
          ),
      ),
    )
  }

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )
  function handleDragEnd(event: { id?: any; active?: any; over?: any }) {
    const { active, over } = event

    if (active.id.toString() !== over.id.toString()) {
      const updatedIssues = arrayMove(
        newGadgetData.brands,
        newGadgetData.brands.findIndex(
          item => item.id === active.id.toString(),
        ),
        newGadgetData.brands.findIndex(item => item.id === over.id.toString()),
      )

      setNewGadgetData({ ...newGadgetData, brands: updatedIssues })
    }
  }

  return (
    <div className='flex w-[800px] justify-between  gap-3'>
      <div className='flex flex-col '>
        <p className='sticky top-0 mb-6 text-center font-exo_2 text-xl font-bold text-white-dis max-lg:text-xl '>
          Вибрані бренди ({newGadgetData.brands.length})
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={newGadgetData.brands.map(item => ({ id: item.id }))}
            strategy={verticalListSortingStrategy}
          >
            <ul className='relative flex w-[380px]  flex-col items-start'>
              {newGadgetData.brands.map(item => (
                <DraggableBrandItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  onRemove={handleRemoveBrandItemClick}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <div className='flex flex-col '>
        <p className='sticky top-0 mb-6 text-center font-exo_2 text-xl font-bold text-white-dis max-lg:text-xl '>
          Доступні бренди ({filteredBrandsData.length})
        </p>
        <ul className='relative flex w-[380px]  flex-col items-start'>
          {filteredBrandsData.map(item => (
            <li
              className='flex w-full items-center justify-between gap-2 border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 first:rounded-t-xl last:rounded-b-xl'
              key={item.id}
            >
              <div className='flex items-center gap-2 p-4'>
                {/* {item.icon && (
                  <Image
                    className='h-[40px] w-[40px] object-center opacity-100'
                    alt={item.icon?.alt || item.title}
                    src={item.icon.src}
                    width={0}
                    height={0}
                  />
                )} */}
                <p className='font-exo_2 text-md font-semibold text-dark-blue max-md:text-lg '>
                  {item?.title || 'No title'}
                </p>
              </div>
              <IoMdAddCircle
                onClick={() => handleAddBrandItemClick(item)}
                className='mr-4 cursor-pointer text-dark-blue  transition-colors hover:text-mid-green focus:text-mid-green'
                size={35}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default EditBrandsList
