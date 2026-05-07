from dataclasses import dataclass


@dataclass
class Athlete:
    name: str
    endo: float
    meso: float
    ecto: float
    color: str
    symbol: str

    @property
    def x(self):
        return round(self.ecto - self.endo, 2)

    @property
    def y(self):
        return round(2 * self.meso - (self.endo + self.ecto), 2)

    def to_dict(self):
        return {
            'name': self.name,
            'endo': self.endo,
            'meso': self.meso,
            'ecto': self.ecto,
            'x': self.x,
            'y': self.y,
            'color': self.color,
            'symbol': self.symbol,
        }
    
    def __post_init__(self):
        MIN_ENDO_MESO_ECTO = 0
        MAX_ENDO_MESO_ECTO = 8
        SUPPORTED_COLORS = ['blue', 'red', 'green']
        SUPPORTED_SYMBOLS = ['circle', 'square', 'triangle']

        if not isinstance(self.name, str):
            raise Exception(f'{self.name} must be a string')

        if MIN_ENDO_MESO_ECTO < self.endo > MAX_ENDO_MESO_ECTO:
            raise Exception(f'Endo must be in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}, current value {self.endo}')
        
        if MIN_ENDO_MESO_ECTO < self.meso > MAX_ENDO_MESO_ECTO:
            raise Exception(f'Meso must be in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}, current value {self.meso}')
        
        if MIN_ENDO_MESO_ECTO < self.ecto > MAX_ENDO_MESO_ECTO:
            raise Exception(f'Ecto must be in range from {MIN_ENDO_MESO_ECTO} to {MAX_ENDO_MESO_ECTO}, current value {self.ecto}')
        
        if self.color not in SUPPORTED_COLORS:
            raise Exception(f"Color '{self.color}' is unsupported, choose from {SUPPORTED_COLORS}")
        
        if self.symbol not in SUPPORTED_SYMBOLS:
            raise Exception(f"Symbol '{self.symbol}' is unsupported, choose from {SUPPORTED_SYMBOLS}")
