import React from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import type { IconButtonProps } from "@material-tailwind/react";

interface PaginationComponentProps {
    pageNumbers: number[];
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
  }

export function PaginationComponent ({ pageNumbers, setCurrentPage, currentPage }: PaginationComponentProps) {
  
    const getItemProps = (index: number) =>
    ({
      onClick: () => {
        setCurrentPage(index)
        window.scrollTo({
          top: 350,
          behavior: 'smooth'
        })
      }
    })

  const next = () => {
    if (currentPage < pageNumbers.length) {
      setCurrentPage(currentPage + 1)
      window.scrollTo({
        top: 350,
        behavior: 'smooth'
      })
    }
  }
  const prev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1)
      window.scrollTo({
        top: 350,
        behavior: 'smooth'
      })
    }
  }

  return (
    <div className="flex items-center gap-4 justify-center">
      <Button
        variant="text"
        className={`flex items-center gap-2 ${currentPage === 1 && 'hover:bg-white cursor-default text-gray-500'}`}
        onClick={prev}
        placeholder=""
      >
        Previous
      </Button>
      <div className="flex items-center gap-2">
        {pageNumbers.map((elem: number) => (
          <IconButton {...getItemProps(elem)} key={elem} placeholder=""  variant={currentPage === elem ? 'filled' : 'text'}
          color='gray'>{elem}</IconButton>
        ))}
      </div>
      <Button
        variant="text"
        className={`flex items-center gap-2 ${currentPage === pageNumbers.length && 'hover:bg-white cursor-default text-gray-500'}`}
        onClick={next}
        placeholder=""
      >
        Next
      </Button>
    </div>
  )
}
