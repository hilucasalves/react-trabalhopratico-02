import { apiGetInvestments } from './api/api'
import { ColorValue, Header, Main } from './components'
import { 
  helperFormatMoney,
  helperFormatMonthYear,
  helperFormatPercent
} from './helpers'

function Investments({children}) {
  return (
    <ul>{children}</ul>
  );
}

function Investment({children}) {
  return (
    <li className="border p-2 my-2">{children}</li>
  );
}

function Reports({children}) {
  return (
    <ul>{children}</ul>
  );
}

function Report({children}) {
  return (
    <li className="flex flex-row items-center justify-between">{children}</li>
  );
}

function Title2({children}) {
  return (
    <h2 className="font-semibold text-center text-xl">
      {children}
    </h2>
  );
}

function Title3({children}) {
  return (
    <h3 className="font-semibold text-center text-lg mt-2">
      {children}
    </h3>
  );
}

export default function App() {

  const investments = apiGetInvestments()

  return (
    <>
      <Header>react-investments</Header>
      <Main>
        <Investments>
          {
            investments.map(investment => {

              const { id, description, totalValue, totalPercent, reports } = investment
              return (
                <Investment key={id}>
                  <Title2>{description}</Title2>

                  <Title3>
                    Rendimento Total: {' '}
                    <ColorValue value={totalValue}>
                      {helperFormatMoney(totalValue)}
                      ({helperFormatPercent(totalPercent)})
                    </ColorValue>
                  </Title3>
                  <div className="mt-2">
                    <Reports>
                      {reports.map(report => {
                        const { id, month, year, value, percent } = report

                        return (
                          <Report key={id}>
                            <span className="font-mono">{helperFormatMonthYear(month, year)}</span>
                              <span className="flex-1 ml-4">
                                <ColorValue value={percent}>
                                  {helperFormatMoney(value)}
                                </ColorValue>
                              </span>
                            
                            <span>
                            <ColorValue value={percent}>
                              {helperFormatPercent(percent)}
                            </ColorValue>
                            </span>
                          </Report>
                        )
                      })}
                    </Reports>
                  </div>
                </Investment>
              )
            })
          }
        </Investments>
      </Main>
    </>
  )
}