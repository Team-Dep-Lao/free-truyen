"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";
import * as React from "react";
import { Button } from "../ui/button";
import { ArrowRightToLine } from "lucide-react";

export interface PaginationBasicProps {
  currentPage: number;
  totalPage: number;
  onPrevious?: () => void;
  onNext?: () => void;
  className?: string;
  onClickLinkPage?: (page: number) => void;
  disableNextButton?: boolean;
  disablePrevButton?: boolean;
}

export function PaginationBasic(props: PaginationBasicProps) {
  return (
    <Pagination className={props.className}>
      <PaginationContent>
        {props.currentPage > props.totalPage / 2 && (
          <PaginationItem>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => props.onClickLinkPage && props.onClickLinkPage(1)}
            >
              <div className="flex flex-row space-x-2 items-center">
                <ArrowRightToLine className="rotate-180" />
                <div>First Page</div>
              </div>
            </Button>
          </PaginationItem>
        )}
        {props.currentPage - 1 > 2 && (
          <PaginationItem>
            <PaginationPrevious
              className="cursor-pointer"
              onClick={() => props.onPrevious && props.onPrevious()}
            />
          </PaginationItem>
        )}

        <PaginationItem
          className={cn([props.currentPage === 1 ? "hidden" : "flex"])}
        >
          <PaginationLink
            onClick={() =>
              props.onClickLinkPage &&
              props.onClickLinkPage(props.currentPage - 1)
            }
            className="cursor-pointer"
          >
            {props.currentPage - 1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            onClick={() =>
              props.onClickLinkPage && props.onClickLinkPage(props.currentPage)
            }
            isActive
            className="cursor-pointer"
          >
            {props.currentPage}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={cn([
            props.currentPage === props.totalPage ? "hidden" : "flex",
          ])}
        >
          <PaginationLink
            className="cursor-pointer"
            onClick={() =>
              props.onClickLinkPage &&
              props.onClickLinkPage(props.currentPage + 1)
            }
          >
            {props.currentPage + 1}
          </PaginationLink>
        </PaginationItem>
        {props.currentPage + 1 < props.totalPage && (
          <React.Fragment>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink
                className="cursor-pointer"
                onClick={() =>
                  props.onClickLinkPage &&
                  props.onClickLinkPage(props.totalPage)
                }
              >
                {props.totalPage}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext
                className="cursor-pointer"
                onClick={() => props.onNext && props.onNext()}
              />
            </PaginationItem>
          </React.Fragment>
        )}
        {props.currentPage < props.totalPage / 2 && (
          <PaginationItem>
            <Button
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() =>
                props.onClickLinkPage && props.onClickLinkPage(props.totalPage)
              }
            >
              <div className="flex flex-row space-x-2 items-center">
                <div>Last Page</div>
                <ArrowRightToLine className="" />
              </div>
            </Button>
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
