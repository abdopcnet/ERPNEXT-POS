<h1 align="center" >
  Point Of Sale app
</h1>

### Overview
This project introduces a **custom Point of Sale (POS)** page built for ERPNext, specifically designed to work in offline mode. The default ERPNext POS system lacks robust offline support, so this custom solution allows sales transactions to continue smoothly even without internet connectivity.

The custom POS page comes pre-installed when you install the app, requiring no manual setup.

<br>

### Chiffrage Doctype overview :
| Tab | photo |
|-----|-------|
|Details                | ![screen1](https://github.com/user-attachments/assets/5ee1c6a7-bf03-4b58-8d12-2861b4eb48bf)|
|Feasibility Study      | ![screen2](https://github.com/user-attachments/assets/df12c7c1-3610-4674-a531-8b192a18e134)|
|Bill of Services       | ![screen3](https://github.com/user-attachments/assets/f80c1470-1537-4b3d-834d-5a40ea708b2e)|
|Bill of Material       | ![screen4](https://github.com/user-attachments/assets/26771f94-9c73-41b5-95cd-b2b2426bebde)|
|Bill of Resources      | ![screen5](https://github.com/user-attachments/assets/201f76bf-f243-4dd8-8ff5-b379e62fc1e5)|
|Other Additional Bills | ![screen6](https://github.com/user-attachments/assets/60e67352-b986-4a5c-8285-269ed5b3a745)|
|Dashboard (we still working on it)  | ![screen8](https://github.com/user-attachments/assets/525ae963-77ec-4e90-97a2-a80b399f576b)| 



### Features
- **Offline Mode Support**: Perform sales and manage transactions even without an internet connection. Data will automatically sync once the connection is restored.
- **User-Friendly Interface**: A simple, responsive, and efficient POS interface that works seamlessly in both online and offline modes.
- **Local Inventory Caching**: Product and inventory data is cached locally, allowing users to search and add items without needing an active connection.
- **Auto-Sync**: Offline transactions are synced with the ERPNext backend as soon as the internet is available, ensuring smooth reconciliation of offline sales data.
- **Integrated into ERPNext**:No manual page setup is required. The POS page is automatically installed with the app.

### Installation
To install the **Halfware App** on your Frappe or ERPNext instance: 
1. **Clone the repository** : 
```bash
$ bench get-app https://github.com/RAYANaouf/ERPNEXT-POS
```
2. **Install the app**:

Go to the directory where your ERPNext instance is set up:
```bash
cd /path/to/frappe-bench
```
Then install the app into your ERPNext site:

```bash
bench get-app  
bench --site [your-site-name] install-app ERPNEXT-POS
```
