import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface AuditLog {
  id: string;
  table_name: string;
  operation: "INSERT" | "UPDATE" | "DELETE";
  record_id: string;
  user_id: string | null;
  old_data: Record<string, unknown> | null;
  new_data: Record<string, unknown> | null;
  ip_address: string | null;
  created_at: string;
}

export interface AuditLogFilters {
  tableName: string;
  operation: string;
  searchTerm: string;
  dateFrom: string;
  dateTo: string;
}

export const useAuditLogs = (filters: AuditLogFilters) => {
  const { tableName, operation, searchTerm, dateFrom, dateTo } = filters;

  return useQuery({
    queryKey: ["audit-logs", tableName, operation, searchTerm, dateFrom, dateTo],
    queryFn: async () => {
      let query = supabase
        .from("audit_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(100);

      if (tableName && tableName !== "all") {
        query = query.eq("table_name", tableName);
      }

      if (operation && operation !== "all") {
        query = query.eq("operation", operation);
      }

      if (dateFrom) {
        query = query.gte("created_at", `${dateFrom}T00:00:00`);
      }

      if (dateTo) {
        query = query.lte("created_at", `${dateTo}T23:59:59`);
      }

      const { data, error } = await query;

      if (error) throw error;

      // Client-side search filtering (for record_id or user_id)
      let filteredData = data as AuditLog[];
      
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        filteredData = filteredData.filter(
          (log) =>
            log.record_id.toLowerCase().includes(term) ||
            log.user_id?.toLowerCase().includes(term) ||
            JSON.stringify(log.new_data).toLowerCase().includes(term) ||
            JSON.stringify(log.old_data).toLowerCase().includes(term)
        );
      }

      return filteredData;
    },
  });
};
