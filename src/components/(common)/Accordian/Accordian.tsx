'use client';
import { useState } from 'react';
import { MinusSmallIcon, PlusSmallIcon } from "@heroicons/react/24/outline";

interface AccordionItem {
  title: string;
  content: string;
}

interface AccordionProps {
  items: AccordionItem[];
}

export default function Accordion({ items }: AccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      {items.map((item, index) => (
        <div key={index} className="mb-8 transition-all duration-500">
          <button
            className={`w-full text-xl flex justify-between items-center text-left  focus:outline-none focus-visible:ring ${
                openIndex === index ? 'text-primary' : 'text-white'
              }`}
            onClick={() => toggle(index)}
          >
            {item.title}
            <span className="ml-2 text-3xl">
              {openIndex === index ? <MinusSmallIcon aria-hidden="true" className="h-6 w-6" /> : <PlusSmallIcon aria-hidden="true" className="h-6 w-6" /> }
            </span>
          </button>
          <div
            className={`transition-max-height duration-300 ease-in-out overflow-hidden ${
              openIndex === index ? 'max-h-96' : 'max-h-0'
            }`}
          >
            <div className="pt-8 text-white">{item.content}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
