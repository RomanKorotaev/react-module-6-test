export default function  ({ pokemon: { sprites, name, stats } }) {
  console.log ('ЗАГРУЗИТСЯ модуль PokemonDataView')
    return (
      <div>
        <img
          src={sprites.other['official-artwork'].front_default}
          width="200"
          // height="240"
          alt={name}
        />
        <h2>{name}</h2>
        <ul>
          {stats.map(entry => (
            <li key={entry.stat.name}>
              {entry.stat.name}: {entry.base_stat}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  