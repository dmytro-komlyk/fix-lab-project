/* eslint-disable react/jsx-no-bind */
/* eslint-disable import/no-extraneous-dependencies */

'use client'

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

import { DraggableBenefitsItem } from './DraggaBenefitsItem'

interface IBenefitsProps {
  newIssueData: Issue
  benefitsData: Benefit[]
  setNewIssueData: (data: Issue) => void
}

const EditBenefitsList: React.FC<IBenefitsProps> = ({
  newIssueData,
  benefitsData,
  setNewIssueData,
}) => {
  const [filteredBenefitsData, setFilteredBenefitsData] = useState<Benefit[]>(
    benefitsData.filter(
      item => !newIssueData.benefits.some(issue => issue.id === item.id),
    ),
  )

  const handleAddBenefitItemClick = (item: Benefit) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedBenefitsArray = [...newIssueData.benefits]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedBenefitsArray.findIndex(
      selectedIssue => selectedIssue.id === item.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedBenefitsArray.push(item)
    } else {
      updatedSelectedBenefitsArray.splice(index, 1)
    }

    // Update the state with the new array
    setNewIssueData({
      ...newIssueData,
      benefits: updatedSelectedBenefitsArray,
    })

    // Remove the selected item from the filteredBenefitsData array
    setFilteredBenefitsData(prevFilteredBenefitsData =>
      prevFilteredBenefitsData.filter(
        filteredIssue => filteredIssue.id !== item.id,
      ),
    )
  }

  const handleRemoveBenefitItemClick = (item: Benefit) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedBenefitsArray = [...newIssueData.benefits]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedBenefitsArray.findIndex(
      selectedIssue => selectedIssue.id === item.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedBenefitsArray.push(item)
    } else {
      updatedSelectedBenefitsArray.splice(index, 1)
    }

    // Remove the selected item from the filteredBenefitsData array
    setFilteredBenefitsData(prevFilteredBenefitsData =>
      prevFilteredBenefitsData.filter(
        filteredIssue => filteredIssue.id !== item.id,
      ),
    )

    // Update the state with the new array of selected benefits
    setNewIssueData({
      ...newIssueData,
      benefits: updatedSelectedBenefitsArray,
    })

    // Update the filteredBenefitsData array based on the remaining benefitsData
    setFilteredBenefitsData(
      benefitsData.filter(
        benefit =>
          !updatedSelectedBenefitsArray.some(
            selectedIssue => selectedIssue.id === benefit.id,
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
    if (active.id !== over.id) {
      const updatedBenefits = arrayMove(
        newIssueData.benefits,
        newIssueData.benefits.findIndex(item => item.id === active.id),
        newIssueData.benefits.findIndex(item => item.id === over.id),
      )

      setNewIssueData({ ...newIssueData, benefits: updatedBenefits })
    }
  }

  return (
    <div className='flex w-[800px] justify-between  gap-3 overflow-auto'>
      <div className='flex flex-col '>
        <p className='mb-6 text-center font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Вибрані ({newIssueData.benefits.length})
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={newIssueData.benefits.map(item => ({ id: item.id }))}
            strategy={verticalListSortingStrategy}
          >
            <ul className='relative flex w-[380px]  flex-col items-start'>
              {newIssueData.benefits.map(benefit => (
                <DraggableBenefitsItem
                  key={benefit.id}
                  id={benefit.id}
                  item={benefit}
                  onRemove={handleRemoveBenefitItemClick}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <div className='flex flex-col '>
        <p className='mb-6 text-center font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Доступні ({filteredBenefitsData.length})
        </p>
        <ul className='relative flex w-[380px]  flex-col items-start'>
          {filteredBenefitsData.map(item => (
            <li
              className='flex w-full items-center justify-between gap-2 border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 first:rounded-t-xl last:rounded-b-xl'
              key={item.id}
            >
              <p className='p-4 font-exo_2 text-md font-semibold text-dark-blue max-md:text-lg'>
                {item?.title || 'No title'}
              </p>
              <IoMdAddCircle
                onClick={() => {
                  handleAddBenefitItemClick(item)
                }}
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

export default EditBenefitsList
