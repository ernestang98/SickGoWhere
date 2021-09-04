import pandas as pd
import os

dir_path = os.path.dirname(os.path.realpath(__file__))

merge = "Clinics & Polyclinics"

df1 = pd.read_csv(dir_path + '/archive/' + merge + ".csv")
df2 = pd.read_csv(dir_path + '/archive/' + merge + "Geo.csv")

(pd.concat([df1, df2], axis=1).to_csv(merge + ' Combined.csv', index=False, na_rep='N/A'))
