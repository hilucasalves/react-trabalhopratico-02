import { apiGetInvestments } from './api/api'
import { Header } from './components'
import { 
  helperFormatMoney,
  helperFormatMonthYear,
  helperFormatPercent
} from './helpers'

export default function App() {

  const investments = apiGetInvestments()

  return (
    <>
      <Header>react-investments</Header>
      <main>
        <div className="container mx-auto p-4">
          <ul>
            {
              investments.map(investment => {
                
                const {id, description, totalValue, totalPercent, reports} = investment
                return (
                  <li key={id} className="border p-2 my-2">
                    <h2 className="font-semibold text-center text-xl">
                      {description}
                    </h2>

                    <h3 className="font-semibold text-center text-lg mt-2">
                      Rendimento Total: {helperFormatMoney(totalValue)} ({helperFormatPercent(totalPercent)})
                    </h3>

                    <ul className="mt-2">
                      {reports.map( report => {
                        const {id, month, year, value, percent} = report 
                        
                        return (
                          <li key={id} className="flex flex-row items-center justify-between">
                            <span className="font-mono">{helperFormatMonthYear(month, year)}</span>
                            <span className="flex-1 ml-4">{helperFormatMoney(value)}</span>
                            <span>{helperFormatPercent(percent)}</span>
                        </li>
                        )
                      })}
                    </ul>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </main>
    </>
  )
}