'use client'

import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useState } from 'react'
import { IoMdAddCircle } from 'react-icons/io'

import { DraggableIssueItem } from './DraggableIssueItem'

interface IssuesProps {
  newGadgetData: Gadget
  issuesData: Issue[]
  setNewGadgetData: (data: Gadget) => void
}

const EditIssuesList: React.FC<IssuesProps> = ({
  newGadgetData,
  issuesData,
  setNewGadgetData,
}) => {
  const [filteredIssuesData, setFilteredIssuesData] = useState<Issue[]>(
    issuesData.filter(
      item => !newGadgetData.issues.some(issue => issue.id === item.id),
    ),
  )

  const handleAddIssueItemClick = (item: Issue) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedIssuesArray = [...newGadgetData.issues]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedIssuesArray.findIndex(
      selectedIssue => selectedIssue.id === item.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedIssuesArray.push(item)
    } else {
      updatedSelectedIssuesArray.splice(index, 1)
    }

    // Update the state with the new array
    setNewGadgetData({
      ...newGadgetData,
      issues: updatedSelectedIssuesArray,
    })

    // Remove the selected item from the filteredIssuesData array
    setFilteredIssuesData(prevFilteredIssuesData =>
      prevFilteredIssuesData.filter(
        filteredIssue => filteredIssue.id !== item.id,
      ),
    )
  }

  const handleRemoveIssueItemClick = (clickedIssue: Issue) => {
    // Clone the existing array to avoid mutating state directly
    const updatedSelectedIssuesArray = [...newGadgetData.issues]

    // Check if the item is already in the array based on its id
    const index = updatedSelectedIssuesArray.findIndex(
      selectedIssue => selectedIssue.id === clickedIssue.id,
    )

    // If it's not in the array, add it; otherwise, remove it
    if (index === -1) {
      updatedSelectedIssuesArray.push(clickedIssue)
    } else {
      updatedSelectedIssuesArray.splice(index, 1)
    }

    // Remove the selected item from the filteredIssuesData array
    setFilteredIssuesData(prevFilteredIssuesData =>
      prevFilteredIssuesData.filter(
        filteredIssue => filteredIssue.id !== clickedIssue.id,
      ),
    )

    // Update the state with the new array of selected issues
    setNewGadgetData({
      ...newGadgetData,
      issues: updatedSelectedIssuesArray,
    })

    // Update the filteredIssuesData array based on the remaining issuesData
    setFilteredIssuesData(
      issuesData.filter(
        item =>
          !updatedSelectedIssuesArray.some(
            selectedIssue => selectedIssue.id === item.id,
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

    if (event.id !== over.id) {
      const updatedIssues = arrayMove(
        newGadgetData.issues,
        newGadgetData.issues.findIndex(item => item.id === active.id),
        newGadgetData.issues.findIndex(item => item.id === over.id),
      )

      setNewGadgetData({ ...newGadgetData, issues: updatedIssues })
    }
  }

  return (
    <div className='flex w-[800px] justify-between  gap-3 '>
      <div className='flex flex-col '>
        <p className='sticky top-0 mb-6 text-center font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Вибрані послуги ({newGadgetData.issues.length})
        </p>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={newGadgetData.issues.map(item => ({ id: item.id }))}
            strategy={verticalListSortingStrategy}
          >
            <ul className='relative flex w-[380px]  flex-col items-start'>
              {newGadgetData.issues.map(item => (
                <DraggableIssueItem
                  key={item.id}
                  id={item.id}
                  item={item}
                  onRemove={handleRemoveIssueItemClick}
                />
              ))}
            </ul>
          </SortableContext>
        </DndContext>
      </div>

      <div className='flex flex-col '>
        <p className='sticky top-0 mb-6 text-center font-exo_2 text-xl  font-bold text-white-dis max-lg:text-xl '>
          Доступні послуги ({filteredIssuesData.length})
        </p>
        <ul className='relative flex w-[380px]  flex-col items-start'>
          {filteredIssuesData.map(item => (
            <li
              className='flex w-full items-center justify-between gap-2 border-b-[0.5px] border-dark-blue bg-white-dis opacity-60 first:rounded-t-xl last:rounded-b-xl'
              key={item.id}
            >
              <p className='p-4 font-exo_2 text-md font-semibold text-dark-blue max-md:text-lg'>
                {item?.title || 'No title'}
              </p>
              <IoMdAddCircle
                onClick={() => {
                  handleAddIssueItemClick(item)
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

export default EditIssuesList
