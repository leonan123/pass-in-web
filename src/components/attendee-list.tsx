import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  MoreHorizontal,
  Search,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import { IconButton } from './icon-button'
import { Table } from './table/table'
import { TableCell } from './table/table-cell'
import { TableHeader } from './table/table-header'
import { TableRow } from './table/table-row'

interface IAttendee {
  id: string
  name: string
  email: string
  createdAt: string
  checkedInAt: string | null
}

export function AttendeeList() {
  const [search, setSearch] = useState(() => {
    const url = new URL(window.location.toString())

    return url.searchParams.get('query') || ''
  })

  const [total, setTotal] = useState(0)
  const [attendees, setAttendees] = useState<IAttendee[]>([])

  const [page, setPage] = useState(() => {
    const url = new URL(window.location.toString())

    if (url.searchParams.has('page')) {
      return Number(url.searchParams.get('page'))
    }

    return 1
  })

  const totalPages = Math.ceil(total / 10)

  useEffect(() => {
    const apiURL = new URL(
      'http://localhost:3333/events/9e9bd979-9d10-4915-b339-3786b1634f33/attendees',
    )

    apiURL.searchParams.set('pageIndex', String(page - 1))

    if (search.length) {
      apiURL.searchParams.set('query', search)
    }

    fetch(apiURL)
      .then((response) => response.json())
      .then((data) => {
        setAttendees(data.attendees)
        setTotal(data.total)
      })
  }, [page, search])

  function setCurrentSearch(search: string) {
    const url = new URL(window.location.toString())

    url.searchParams.set('query', String(search))

    window.history.pushState({}, '', url)

    setSearch(search)
  }

  function setCurrentPage(page: number) {
    const url = new URL(window.location.toString())

    url.searchParams.set('page', String(page))

    window.history.pushState({}, '', url)

    setPage(page)
  }

  function handleSearchChange(event: React.ChangeEvent<HTMLInputElement>) {
    setCurrentSearch(event.target.value)
    setCurrentPage(1)
  }

  function goToFirstPage() {
    setCurrentPage(1)
  }

  function goToPreviousPage() {
    if (page > 1) {
      setCurrentPage(page - 1)
    }
  }

  function goToNextPage() {
    if (page < totalPages) {
      setCurrentPage(page + 1)
    }
  }

  function goToLastPage() {
    setCurrentPage(totalPages)
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold">Participantes</h1>

        <div className="flex w-72 items-center gap-3 rounded-lg border border-white/10 px-3 py-1.5">
          <Search className="size-4 text-emerald-300" />

          <input
            placeholder="Buscar participante"
            className="h-auto flex-1 border-0 bg-transparent p-0 text-sm outline-none focus:ring-0"
            onChange={handleSearchChange}
            value={search}
          />
        </div>
      </div>

      <Table>
        <thead>
          <tr className="border-b border-white/10">
            <TableHeader style={{ width: 48 }}>
              <input
                type="checkbox"
                className="size-4 rounded border border-white/10 bg-black/20 checked:text-orange-400 focus:outline-none focus:ring-orange-300"
              />
            </TableHeader>
            <TableHeader>Código</TableHeader>
            <TableHeader>Participante</TableHeader>
            <TableHeader>Data de inscrição</TableHeader>
            <TableHeader>Data do check-in</TableHeader>
            <TableHeader style={{ width: 64 }}></TableHeader>
          </tr>
        </thead>

        <tbody>
          {attendees.map((attendee) => (
            <TableRow key={attendee.id}>
              <TableCell>
                <input
                  type="checkbox"
                  className="size-4 rounded border border-white/10 bg-black/20 checked:text-orange-400 focus:outline-none focus:ring-orange-300"
                />
              </TableCell>
              <TableCell>{attendee.id}</TableCell>
              <TableCell>
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-white">
                    {attendee.name}
                  </span>
                  <span>{attendee.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {formatDistanceToNow(attendee.createdAt, {
                  locale: ptBR,
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell>
                {attendee.checkedInAt ? (
                  formatDistanceToNow(attendee.checkedInAt, {
                    locale: ptBR,
                    addSuffix: true,
                  })
                ) : (
                  <span className="text-zinc-400">Não fez check-in</span>
                )}
              </TableCell>
              <TableCell>
                <IconButton transparent>
                  <MoreHorizontal className="size-4" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>

        <tfoot>
          <tr>
            <TableCell colSpan={3}>
              Mostrando {attendees.length} de {total} itens
            </TableCell>
            <TableCell colSpan={3} className="text-right">
              <div className="inline-flex items-center gap-8">
                <span>
                  Página {page} de {totalPages}
                </span>

                <div className="flex items-center gap-3">
                  <IconButton onClick={goToFirstPage} disabled={page === 1}>
                    <ChevronsLeft className="size-4" />
                  </IconButton>

                  <IconButton onClick={goToPreviousPage} disabled={page === 1}>
                    <ChevronLeft className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToNextPage}
                    disabled={page === totalPages}
                  >
                    <ChevronRight className="size-4" />
                  </IconButton>

                  <IconButton
                    onClick={goToLastPage}
                    disabled={page === totalPages}
                  >
                    <ChevronsRight className="size-4" />
                  </IconButton>
                </div>
              </div>
            </TableCell>
          </tr>
        </tfoot>
      </Table>
    </div>
  )
}
