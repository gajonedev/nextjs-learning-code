/**
 * Contient toute la loique de requête de la base de donnée
 */

import { sql } from "@vercel/postgres";
import {
  CustomerField,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  Revenue,
} from "./definitions";
import { formatCurrency } from "./utils";


// ==================================================================== //

// Fonction pour récupérer les revenues depuis la base de données
export async function fetchRevenue() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 1000));

    // On requête la base de données pour les revenues
    const data = await sql<Revenue>`SELECT * FROM revenue`;
    
    // On retourne les donneés obtenues
    return data.rows;
  } catch (error) {
    // En cas d'erreur ....
    console.error("Database Error:", error);
    throw new Error("Failed to fetch revenue data.");
  }
}


// ==================================================================== //

// Fonction pour récupérer les latest invoices depuis la base de données
export async function fetchLatestInvoices() {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    // On requête la base de données pour les latest invoices
    const data = await sql<LatestInvoiceRaw>`
    SELECT invoices.amount, customers.name, customers.image_url, customers.email, invoices.id
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      ORDER BY invoices.date DESC
      LIMIT 5`;

    // On optimise les latest invoices en convertissant leurs amount de manière appropriée
    const latestInvoices = data.rows.map((invoice) => ({
      // On spread tout les latest invoices
      ...invoice,
      // On convertit leurs amount
      amount: formatCurrency(invoice.amount),
    }));
    // On retourne les latestInvoices optimisés
    return latestInvoices;
  } catch (error) {
    // En cas d'erreur ...
    console.error("Database Error:", error);
    throw new Error("Failed to fetch the latest invoices.");
  }
}


// ==================================================================== //

// Fonction pour recupérer les totaux des options spécifiques depuis la base de donneés
export async function fetchCardData() {
  try {
    // You can probably combine these into a single SQL query
    // However, we are intentionally splitting them to demonstrate
    // how to initialize multiple queries in parallel with JS.

    // Logique pour récupérer le nombre total d'invoice
    const invoiceCountPromise = sql`SELECT COUNT(*) FROM invoices`;
    // Logique pour récupérer le nombre total de customers
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    // Logique pour récupérer le nombre total d'invoice "paid" ou "pending"
    const invoiceStatusPromise = sql`SELECT
         SUM(CASE WHEN status = 'paid' THEN amount ELSE 0 END) AS "paid",
         SUM(CASE WHEN status = 'pending' THEN amount ELSE 0 END) AS "pending"
         FROM invoices`;

    //  await new Promise((resolve) => setTimeout(resolve, 1000));

    // On rassemble toutes les logiques de récupération dans une promesse pour garantir leur resolution en simultanée
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);

    // On filtre le nombre total d'invoices
    const numberOfInvoices = Number(data[0].rows[0].count ?? "0");
    // On filtre le nombre total de customers
    const numberOfCustomers = Number(data[1].rows[0].count ?? "0");
    // On filtre le nombre total d'invoices "paid"
    const totalPaidInvoices = formatCurrency(data[2].rows[0].paid ?? "0");
    // On filtre le nombre total d'invoices "pending"
    const totalPendingInvoices = formatCurrency(data[2].rows[0].pending ?? "0");

    // La fonction retourne toutes ces valeurs
    return {
      numberOfCustomers,
      numberOfInvoices,
      totalPaidInvoices,
      totalPendingInvoices,
    };
  } catch (error) {
    // En cas d'erreur ...
    console.error("Database Error:", error);
    throw new Error("Failed to fetch card data.");
  }
}


// ==================================================================== //

// Logique pour afficher de les invoices de manière filtée en utilisant la pagination et la recherche

// Nombre d'invoice par page
const ITEMS_PER_PAGE = 6;
// Fonction de requêtage de la base de donneés
export async function fetchFilteredInvoices(
  query: string,
  currentPage: number
) {
  //
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    // Requêtage de la base de donneés
    const invoices = await sql<InvoicesTable>`
      SELECT
        invoices.id,
        invoices.amount,
        invoices.date,
        invoices.status,
        customers.name,
        customers.email,
        customers.image_url
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`} OR
        invoices.amount::text ILIKE ${`%${query}%`} OR
        invoices.date::text ILIKE ${`%${query}%`} OR
        invoices.status ILIKE ${`%${query}%`}
      ORDER BY invoices.date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    // On retourne les ivoices recupérés
    return invoices.rows;
  } catch (error) {
    // En cas d'erreur ...
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoices.");
  }
}


// ==================================================================== //

// Fonction pour récupérer le nombre total de pages à afficher pour les invoices
export async function fetchInvoicesPages(query: string) {
  try {
    // Logique SQL pour requêter la base de données
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    // On calcule le nombre total de pages
    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);

    // ON retourne le nombre total de pages
    return totalPages;
  } catch (error) {
    // En cas d'erreur ...
    console.error("Database Error:", error);
    throw new Error("Failed to fetch total number of invoices.");
  }
}


// ==================================================================== //

// Fonction pour récupérer une seule Invoice via son id
export async function fetchInvoiceById(id: string) {
  try {
    // On requête la base de données
    const data = await sql<InvoiceForm>`
      SELECT
        invoices.id,
        invoices.customer_id,
        invoices.amount,
        invoices.status
      FROM invoices
      WHERE invoices.id = ${id};
    `;

    // On filtre les données récupérées
    const invoice = data.rows.map((invoice) => ({
      ...invoice,
      // Convert amount from cents to dollars
      amount: invoice.amount / 100,
    }));

    // On retourne les données récupérées
    return invoice[0];
  } catch (error) {
    // En cas d'erreur ...
    console.error("Database Error:", error);
    throw new Error("Failed to fetch invoice.");
  }
}


// ==================================================================== //

// Fonction pour récupérer tous les customers disponibles
export async function fetchCustomers() {
  try {
    // Requêtage de la base de donneés
    const data = await sql<CustomerField>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    // On filtre le donnée récupérée
    const customers = data.rows;

    // On retourne la donnée recupérée
    return customers;
  } catch (err) {
    // En cas d'erreur
    console.error("Database Error:", err);
    throw new Error("Failed to fetch all customers.");
  }
}


// ==================================================================== //

export async function fetchFilteredCustomers(query: string) {
  try {
    const data = await sql<CustomersTableType>`
		SELECT
		  customers.id,
		  customers.name,
		  customers.email,
		  customers.image_url,
		  COUNT(invoices.id) AS total_invoices,
		  SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
		  SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
		FROM customers
		LEFT JOIN invoices ON customers.id = invoices.customer_id
		WHERE
		  customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
		GROUP BY customers.id, customers.name, customers.email, customers.image_url
		ORDER BY customers.name ASC
	  `;

    const customers = data.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));

    return customers;
  } catch (err) {
    console.error("Database Error:", err);
    throw new Error("Failed to fetch customer table.");
  }
}
